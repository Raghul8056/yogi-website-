'use client';
import Masonry from './Masonry';

const items = [
  {
    id: "step1",
    img: "/images/step1.png",
    url: "#",
    height: 600,
  },
  {
    id: "step2",
    img: "/images/step2.png",
    url: "#",
    height: 600,
  },
  {
    id: "step3",
    img: "/images/step3.png",
    url: "#",
    height: 600,
  },
  {
    id: "step4",
    img: "/images/step4.png",
    url: "#",
    height: 600,
  },
  {
    id: "step5",
    img: "/images/step5.png",
    url: "#",
    height: 600,
  }
];

export default function WhatsAppMasonryGallery() {
  return (
    <div className="w-full h-[400px] lg:h-[450px] relative">
      <Masonry
        items={items}
        ease="power4.in"
        duration={1.5}
        stagger={0.2}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.97}
        blurToFocus={true}
        colorShiftOnHover={false}
      />
    </div>
  );
}
