'use client';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => window.matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Triggers when 10% of the section is visible
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  const getInitialPosition = item => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((child, index) => {
      let col = colHeights.indexOf(Math.min(...colHeights));
      
      // Explicitly place the bottom 3 images to perfectly center them
      if (index === 5) col = 3;
      if (index === 6) col = 2;
      if (index === 7) col = 1; // Last image placed under the second image

      const x = columnWidth * col;
      const height = child.height / 2;
      
      // Add a 100px vertical gap for any item that is not the first in its column
      const verticalGap = colHeights[col] > 0 ? 100 : 0;
      const y = colHeights[col] + verticalGap;

      colHeights[col] += height + verticalGap;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady || !isInView) return;

    // Create a map of horizontal order based on visual X positions
    const sortedByX = [...grid].sort((a, b) => a.x - b.x);
    const horizontalOrder = {};
    sortedByX.forEach((item, idx) => {
      horizontalOrder[item.id] = idx;
    });

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item, index);

        // Size doesn't change during the entrance — set it once so the tween
        // only touches compositor-friendly transform/opacity, not layout.
        gsap.set(selector, { width: item.w, height: item.h });

        // Set initial state before animation
        gsap.set(selector, {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          scale: 0.9,
          filter: blurToFocus ? 'blur(10px)' : 'none'
        });

        // 1. Initial Entrance Pop
        const tl = gsap.timeline({ delay: index * stagger });
        
        tl.to(selector, {
          opacity: 1,
          x: item.x,
          y: item.y,
          scale: 1.05, // Slight pop
          filter: blurToFocus ? 'blur(0px)' : 'none',
          duration: 0.5,
          ease: 'power2.out'
        }).to(selector, {
          scale: 1,
          filter: 'none',
          duration: 0.4,
          ease: 'power2.inOut'
        });

        // 2. Yogi Flyby Sweeping Highlight (Syncs exactly with the 1.5s flyby)
        // Yogi starts flying at 1.5s, takes 1.4s to cross.
        // We time each card's highlight to pop exactly when Yogi passes horizontally.
        const waveDelays = [1.75, 1.95, 2.20, 2.45, 2.70];
        const visualIndex = horizontalOrder[item.id] ?? index;
        const waveDelay = waveDelays[visualIndex % waveDelays.length];
        
        const glowSelector = `${selector} .glow-shadow-img`;
        const waveTl = gsap.timeline({ delay: waveDelay });
        
        waveTl.to(glowSelector, {
          opacity: 0.95,
          duration: 0.15, // fast pop-in
          ease: 'power1.out'
        }).to(glowSelector, {
          opacity: 0,
          duration: 0.25, // get off instantly
          ease: 'power1.inOut'
        });

        const scaleTl = gsap.timeline({ delay: waveDelay });
        scaleTl.to(selector, {
          scale: 1.06,
          duration: 0.15,
          ease: 'power1.out'
        }).to(selector, {
          scale: 1,
          duration: 0.25,
          ease: 'power1.inOut'
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, isInView, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e, item) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3
        });
      }
    }
  };

  const handleMouseLeave = (e, item) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="list">
      {grid.map(item => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            onClick={() => window.open(item.url, '_blank', 'noopener')}
            onMouseEnter={e => handleMouseEnter(e, item)}
            onMouseLeave={e => handleMouseLeave(e, item)}
          >
            {/* Duplicate image layer with static drop shadow to perfectly trace transparent boundaries without browser filter bugs */}
            <div
              className="glow-shadow-img"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                filter: 'drop-shadow(0 0 25px #c084fc) brightness(1.2)',
                opacity: 0,
                pointerEvents: 'none',
                zIndex: -1
              }}
            />
            <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
                    opacity: 0,
                    pointerEvents: 'none',
                    borderRadius: '8px'
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
