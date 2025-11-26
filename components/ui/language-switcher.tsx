"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useState } from "react";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Get current locale from pathname
  const currentLocale = pathname.startsWith('/fa') ? 'fa' : 'en';

  const switchLocale = (locale: string) => {
    // Remove current locale from pathname
    const pathnameWithoutLocale = pathname.replace(/^\/(en|fa)/, '');
    // Add new locale
    const newPath = `/${locale}${pathnameWithoutLocale || ''}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">{currentLocale}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 right-0 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden min-w-[120px] z-50"
        >
          <button
            onClick={() => switchLocale('en')}
            className={`w-full px-4 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-3 ${
              currentLocale === 'en' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
            }`}
          >
            <span className="text-2xl">🇬🇧</span>
            <span className="font-medium">English</span>
          </button>
          <button
            onClick={() => switchLocale('fa')}
            className={`w-full px-4 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-3 ${
              currentLocale === 'fa' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
            }`}
          >
            <span className="text-2xl">🇮🇷</span>
            <span className="font-medium">فارسی</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
