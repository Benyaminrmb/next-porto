"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface HeroMinimalProps {
  name: string;
  title?: string;
  description: string;
}

export function HeroMinimal({ name, title, description }: HeroMinimalProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';
  const t = useTranslations('home');

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-secondary/[0.03]" />

      {/* Soft radial gradients */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-secondary/[0.06] rounded-full blur-[120px]" />

      {/* Main content */}
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Small greeting text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-white/40 font-medium">
              {locale === 'fa' ? 'طراح و توسعه‌دهنده' : 'Designer & Developer'}
            </span>
          </motion.div>

          {/* Large name/title - Bold typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            <span className="block text-white">
              {locale === 'fa' ? name : name.split(' ')[0]}
            </span>
            <span className="block bg-gradient-to-r from-white/90 via-white/60 to-white/90 bg-clip-text text-transparent">
              {locale === 'fa' ? title || t('defaultTitle') : name.split(' ')[1] || 'Developer'}
            </span>
          </motion.h1>

          {/* Subtle description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            {description.split('.')[0]}.
          </motion.p>

          {/* Single clear CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Button
                as={Link}
                href={`/${locale}/projects`}
                size="lg"
                className="group relative bg-white text-black font-semibold px-8 py-6 text-base rounded-full hover:bg-white/90 transition-all"
                endContent={
                  <motion.div
                    animate={{ x: isRTL ? [-3, 0, -3] : [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </motion.div>
                }
              >
                {t('viewMyWork')}
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Button
                as="a"
                href={`mailto:benyaminrmb@gmail.com`}
                size="lg"
                variant="bordered"
                className="border border-white/10 text-white/70 hover:text-white hover:border-white/30 px-8 py-6 text-base rounded-full font-medium backdrop-blur-sm transition-all"
              >
                {locale === 'fa' ? 'تماس' : 'Get in touch'}
              </Button>
            </motion.div>
          </motion.div>

          {/* Minimal availability indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 flex items-center justify-center gap-2 text-sm text-white/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="font-light">
              {locale === 'fa' ? 'آماده پذیرش پروژه' : 'Available for projects'}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1.5 bg-white/30 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
