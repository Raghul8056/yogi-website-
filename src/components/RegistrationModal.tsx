"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useRegistrationModal } from "@/context/RegistrationModalContext";

export default function RegistrationModal() {
  const { isOpen, closeModal } = useRegistrationModal();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [country, setCountry] = useState("India");
  const [timeline, setTimeline] = useState("");

  const resetState = () => {
    setStep(1);
    setIsSuccess(false);
    setIsSubmitting(false);
    setName("");
    setEmail("");
    setPhoneCode("+91");
    setPhone("");
    setTeamSize("");
    setCountry("India");
    setTimeline("");
  };

  const handleClose = () => {
    closeModal();
    // Delay reset slightly to allow exit animation to finish
    setTimeout(resetState, 300);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1500);
  };

  const timelineOptions = [
    { id: "immediately", label: "⚡ Immediately" },
    { id: "30_days", label: "📅 Within 30 Days" },
    { id: "3_months", label: "🚀 Within 3 Months" },
    { id: "exploring", label: "👀 Just Exploring" },
  ];

  const teamSizeOptions = ["Just Me", "2-10", "11-50", "51-200", "200+"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Panel (Yogi Graphic) */}
              <div className="hidden md:flex md:w-5/12 bg-zinc-50 flex-col items-center justify-center p-8 relative overflow-hidden border-r border-zinc-100">
                {/* Decorative blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                
                <img 
                  src="/images/purple_monks/11.png" 
                  alt="3D Yogi" 
                  className="w-full max-w-[250px] relative z-10 object-contain drop-shadow-xl"
                />
                
                <div className="relative z-10 mt-8 bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 text-center mx-4">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-zinc-300" />
                    <span className="w-2 h-2 rounded-full bg-zinc-300" />
                    <span className="w-2 h-2 rounded-full bg-zinc-300" />
                  </div>
                  <p className="text-sm font-medium text-zinc-700">
                    {step === 1 
                      ? "I'll become your AI Chief of Staff." 
                      : "Almost done! Just a few more details..."}
                  </p>
                </div>
              </div>

              {/* Right Panel (Form) */}
              <div className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-zinc-900 mb-2">You're all set!</h3>
                      <p className="text-zinc-600">Our team will be in touch shortly.</p>
                    </motion.div>
                  ) : step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex-1 flex flex-col"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-2">
                        Welcome to Workfast
                      </h2>
                      <p className="text-zinc-500 font-medium mb-8">Step 1 of 2</p>

                      <form onSubmit={handleContinue} className="flex-1 flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-semibold text-zinc-900">Name</label>
                          <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#5b52f6]/20 focus:border-[#5b52f6] transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-semibold text-zinc-900">Email</label>
                          <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#5b52f6]/20 focus:border-[#5b52f6] transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-semibold text-zinc-900">Phone</label>
                          <div className="flex gap-2">
                            <div className="relative w-28 shrink-0">
                              <select
                                value={phoneCode}
                                onChange={(e) => setPhoneCode(e.target.value)}
                                className="w-full px-3 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#5b52f6]/20 focus:border-[#5b52f6] transition-all appearance-none text-zinc-900 font-medium text-sm"
                              >
                                <option value="+91">🇮🇳 +91</option>
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+44">🇬🇧 +44</option>
                                <option value="+61">🇦🇺 +61</option>
                                <option value="+971">🇦🇪 +971</option>
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs">
                                ▼
                              </div>
                            </div>
                            <input 
                              type="tel" 
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="(555) 000-0000"
                              className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#5b52f6]/20 focus:border-[#5b52f6] transition-all"
                            />
                          </div>
                        </div>

                        <button 
                          type="submit"
                          className="mt-auto w-full py-4 rounded-xl bg-[#5b52f6] hover:bg-[#4a42d6] text-white font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          Continue
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex-1 flex flex-col"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-2">
                        Let's build your workspace 🚀
                      </h2>
                      <p className="text-zinc-500 font-medium mb-6">Step 2 of 2</p>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-2 mb-8 select-none">
                        <div className="flex flex-col gap-1">
                          <div className="w-3 h-3 rounded-full bg-[#5b52f6]" />
                          <span className="text-[10px] font-semibold text-[#5b52f6] whitespace-nowrap">About You</span>
                        </div>
                        <div className="flex-1 h-[2px] bg-[#5b52f6]" />
                        <div className="flex flex-col gap-1">
                          <div className="w-3 h-3 rounded-full bg-[#5b52f6]" />
                          <span className="text-[10px] font-semibold text-[#5b52f6] whitespace-nowrap">Workspace</span>
                        </div>
                        <div className="flex-1 h-[2px] bg-zinc-200" />
                        <div className="flex flex-col gap-1">
                          <div className="w-3 h-3 rounded-full bg-zinc-200" />
                          <span className="text-[10px] font-semibold text-zinc-400 whitespace-nowrap">Finish</span>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
                        {/* Team Size */}
                        <div className="flex flex-col gap-3">
                          <label className="text-sm font-semibold text-zinc-900 flex items-center gap-1.5">
                            👥 Team Size
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {teamSizeOptions.map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => setTeamSize(size)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  teamSize === size 
                                    ? "bg-[#5b52f6] text-white" 
                                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Country */}
                        <div className="flex flex-col gap-3">
                          <label className="text-sm font-semibold text-zinc-900 flex items-center gap-1.5">
                            🌍 Country
                          </label>
                          <div className="relative">
                            <select 
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#5b52f6]/20 focus:border-[#5b52f6] transition-all appearance-none text-zinc-900 font-medium"
                            >
                              <option value="India">India</option>
                              <option value="United States">United States</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="Australia">Australia</option>
                              <option value="Canada">Canada</option>
                              <option value="Other">Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                              ▼
                            </div>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex flex-col gap-3">
                          <label className="text-sm font-semibold text-zinc-900 flex items-center gap-1.5">
                            ⏳ When would you like to start?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {timelineOptions.map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setTimeline(opt.id)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border text-left ${
                                  timeline === opt.id 
                                    ? "bg-[#5b52f6]/5 border-[#5b52f6] text-[#5b52f6]" 
                                    : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto flex items-center gap-4">
                          <button 
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-6 py-4 rounded-xl text-zinc-500 hover:bg-zinc-100 font-semibold transition-colors"
                          >
                            Back
                          </button>
                          <button 
                            type="submit"
                            disabled={!teamSize || !timeline || isSubmitting}
                            className="flex-1 py-4 rounded-xl bg-[#5b52f6] hover:bg-[#4a42d6] disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed text-white font-semibold transition-colors flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                Submit
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Note */}
                {!isSuccess && (
                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-center gap-2 text-xs font-medium text-zinc-400">
                    <span className="w-3 h-3 flex items-center justify-center rounded-sm bg-zinc-200 text-zinc-500">
                      🔒
                    </span>
                    Secure Setup • Takes less than 30 seconds • No Credit Card Required
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
