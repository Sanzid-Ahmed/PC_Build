import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiX, FiCheckCircle } from "react-icons/fi";
import { FaMicrochip, FaShoppingCart, FaDesktop } from "react-icons/fa";

const GlobalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check whether the popup has already been shown during this session
    const popupShown = sessionStorage.getItem("thriftbuild-popup-shown");

    if (popupShown) {
      return;
    }

    // Show popup after 1 second delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("thriftbuild-popup-shown", "true");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closePopup();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d12] shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            {/* Top Glow Accent Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/80 to-primary/30 shadow-[0_0_15px_rgba(229,9,47,0.5)]" />

            {/* Close Button */}
            <button
              type="button"
              onClick={closePopup}
              aria-label="Close popup"
              className="group absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-primary/50 hover:bg-primary hover:text-white active:scale-90"
            >
              <FiX className="text-lg transition-transform duration-300 group-hover:rotate-90" />
            </button>

            {/* Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Left Side: Brand Highlights */}
              <div className="relative flex flex-col justify-between overflow-hidden bg-white/[0.02] p-6 sm:p-8 md:col-span-7">
                
                {/* Background Ambient Glows */}
                <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-primary shadow-[0_0_12px_rgba(229,9,47,0.2)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                    ThriftBuild Configurator
                  </div>

                  {/* Headline */}
                  <h2 className="text-2xl font-black text-white sm:text-3xl leading-tight">
                    Build Your <br />
                    <span className="bg-gradient-to-r from-primary via-red-400 to-primary bg-clip-text text-transparent">
                      Dream PC
                    </span>
                  </h2>

                  <p className="mt-2.5 text-xs text-white/60 leading-relaxed">
                    Filter components, compare real-time store pricing, and optimize your setup within your target budget.
                  </p>

                  {/* Key Feature List */}
                  <div className="mt-6 space-y-2.5">
                    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 backdrop-blur-sm">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                        <FaMicrochip className="text-xs" />
                      </div>
                      <span className="text-xs font-semibold text-white/80">
                        Smart Compatibility Check
                      </span>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 backdrop-blur-sm">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                        <FaShoppingCart className="text-xs" />
                      </div>
                      <span className="text-xs font-semibold text-white/80">
                        Live Price Aggregation
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Primary CTA */}
              <div className="flex flex-col items-center justify-center border-t border-white/10 bg-black/40 p-6 sm:p-8 md:col-span-5 md:border-l md:border-t-0">
                <div className="w-full text-center">
                  
                  {/* Graphic Icon */}
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_20px_rgba(229,9,47,0.25)]">
                    <FaDesktop className="text-2xl" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white">
                    Ready to Start?
                  </h3>

                  <p className="mt-1 text-xs text-white/50">
                    Configure your next custom rig step-by-step.
                  </p>

                  {/* Actions */}
                  <div className="mt-6 space-y-2.5">
                    <Link
                      to="/build-pc"
                      onClick={closePopup}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 active:scale-95"
                    >
                      <span>Build My PC</span>
                      <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <button
                      type="button"
                      onClick={closePopup}
                      className="w-full rounded-xl border border-transparent px-4 py-2.5 text-xs font-semibold text-white/40 transition-colors duration-200 hover:border-white/10 hover:bg-white/5 hover:text-white"
                    >
                      Maybe Later
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalPopup;