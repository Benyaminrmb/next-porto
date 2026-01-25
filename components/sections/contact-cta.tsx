"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { Mail, ArrowRight, ArrowLeft, Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";

interface ContactCTAProps {
  email: string;
}

export function ContactCTA({ email }: ContactCTAProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';
  const t = useTranslations('home');

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-primary/20 via-secondary/10 to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Card */}
          <div className="relative glass-card p-8 md:p-12 overflow-hidden neon-border">
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 rounded-full blur-[100px]" />

            <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Icon */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-50 animate-pulse" />
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center">
                  <Send className="w-10 h-10 text-black" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-start">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium uppercase tracking-wider">
                    {locale === 'fa' ? 'آماده همکاری' : 'Open for opportunities'}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                  {t('letsWorkTogether')}
                </h2>
                <p className="text-white/50 max-w-lg">
                  {t('contactDescription')}
                </p>
              </div>

              {/* Action */}
              <div className="flex flex-col items-center gap-4">
                <Button
                  as="a"
                  href={`mailto:${email}`}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 text-black font-semibold px-8 rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all"
                  startContent={<Mail className="h-5 w-5" />}
                  endContent={isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                >
                  {locale === 'fa' ? 'ارسال ایمیل' : 'Send an Email'}
                </Button>
                <span className="text-sm text-white/30 font-mono">
                  {email}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
