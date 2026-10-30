import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X } from "lucide-react";
import { useTheme } from "../ThemeContext";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
      setIsInstalled(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setIsVisible(true), 2500);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-xs"
        >
          <div className="p-4 rounded-xl border shadow-lg backdrop-blur-md flex items-center gap-3 bg-[#fcfbf7]/95 dark:bg-black/95 border-[#ded5c2] dark:border-white/15">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#eee7d7] dark:bg-[#8ea86d]/15 text-[#3e5026] dark:text-[#8ea86d]">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#1b2214] dark:text-[#f5f2ea]">Install Web App</p>
              <p className="text-[11px] text-[#6d7563] dark:text-[#9ea695]">Access offline & faster</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleInstallClick}
                className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#364421] text-[#f7f3ea] dark:bg-[#8ea86d] dark:text-black"
              >
                Install
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-md text-[#6d7563] hover:text-[#1b2214] dark:text-[#9ea695] dark:hover:text-[#f5f2ea]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
