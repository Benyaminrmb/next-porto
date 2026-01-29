"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";

interface Contact {
  email: string;
  github?: string;
  linkedin?: string;
}

interface ContactMinimalProps {
  contact: Contact;
}

export function ContactMinimal({ contact }: ContactMinimalProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';

  const socialLinks = [
    contact.github && {
      icon: Github,
      href: contact.github,
      label: 'GitHub',
    },
    contact.linkedin && {
      icon: Linkedin,
      href: contact.linkedin,
      label: 'LinkedIn',
    },
  ].filter(Boolean) as Array<{ icon: any; href: string; label: string }>;

  return (
    <section className="py-32 md:py-40 relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.08] rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-white/40 font-medium">
              {locale === 'fa' ? 'تماس' : 'Contact'}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            <span className="block text-white">
              {locale === 'fa' ? 'بیایید همکاری کنیم' : "Let's work"}
            </span>
            <span className="block bg-gradient-to-r from-white/90 via-white/60 to-white/90 bg-clip-text text-transparent">
              {locale === 'fa' ? '' : 'together'}
            </span>
          </motion.h2>

          {/* Subtle description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            {locale === 'fa'
              ? 'آماده‌ام تا ایده‌های شما را به واقعیت تبدیل کنم.'
              : "I'm ready to help bring your ideas to life."}
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Button
                as="a"
                href={`mailto:${contact.email}`}
                size="lg"
                className="group relative bg-white text-black font-semibold px-8 py-6 text-base rounded-full hover:bg-white/90 transition-all"
                startContent={<Mail className="h-4 w-4" />}
                endContent={
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                }
              >
                {contact.email}
              </Button>
            </motion.div>
          </motion.div>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center justify-center gap-6"
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7 + i * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.3, ease: "easeInOut" }
                  }}
                  className="group flex flex-col items-center gap-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:border-white/30 transition-all"
                  >
                    <social.icon className="h-5 w-5 text-white/60 group-hover:text-white/90 transition-colors" />
                  </motion.div>
                  <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Response time indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 text-sm text-white/30 font-light"
          >
            {locale === 'fa'
              ? 'معمولاً ظرف 24 ساعت پاسخ می‌دهم'
              : 'I typically respond within 24 hours'}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
