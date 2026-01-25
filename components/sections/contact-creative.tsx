"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Mail, Github, Linkedin, ExternalLink, Send, Sparkles } from "lucide-react";
import { Button } from "@heroui/react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LampContainer } from "@/components/ui/lamp";

interface Contact {
  email: string;
  github?: string;
  linkedin?: string;
}

interface ContactCreativeProps {
  contact: Contact;
}

export function ContactCreative({ contact }: ContactCreativeProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';

  const socialLinks = [
    contact.github && {
      icon: Github,
      href: contact.github,
      label: 'GitHub',
      color: 'hover:text-white',
    },
    contact.linkedin && {
      icon: Linkedin,
      href: contact.linkedin,
      label: 'LinkedIn',
      color: 'hover:text-blue-400',
    },
    {
      icon: Mail,
      href: `mailto:${contact.email}`,
      label: 'Email',
      color: 'hover:text-primary',
    },
  ].filter(Boolean) as Array<{ icon: any; href: string; label: string; color: string }>;

  return (
    <section className="relative overflow-hidden">
      {/* Lamp Background Effect */}
      <LampContainer className="min-h-[85vh] md:min-h-[90vh]">
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
          {/* Sparkle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-8 md:space-y-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full glass-card border border-primary/30"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-base font-bold text-primary uppercase tracking-wide">
                  {locale === 'fa' ? 'تماس با من' : 'Get in Touch'}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text leading-tight"
              >
                {locale === 'fa' ? (
                  <>
                    بیایید چیزی شگفت‌انگیز
                    <br />
                    بسازیم
                  </>
                ) : (
                  <>
                    Let's Build Something
                    <br />
                    Amazing Together
                  </>
                )}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto"
              >
                {locale === 'fa'
                  ? 'آماده‌ام تا ایده‌های شما را به واقعیت تبدیل کنم. بیایید پروژه بعدی را با هم بسازیم!'
                  : "Ready to bring your ideas to life? Let's collaborate on your next project!"}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-12 md:pt-14"
            >
              <MagneticButton>
                <Button
                  as="a"
                  href={`mailto:${contact.email}`}
                  size="lg"
                  className="group relative bg-gradient-to-r from-primary to-primary/80 text-black font-bold px-12 py-8 text-xl rounded-2xl hover:shadow-2xl hover:shadow-primary/50 transition-all overflow-hidden"
                  startContent={<Send className="w-6 h-6" />}
                >
                  <span className="relative z-10">
                    {locale === 'fa' ? 'ارسال ایمیل' : 'Send Email'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </MagneticButton>

              {contact.github && (
                <MagneticButton>
                  <Button
                    as="a"
                    href={contact.github}
                    target="_blank"
                    size="lg"
                    variant="bordered"
                    className="group border-2 border-white/20 text-white hover:bg-white/5 hover:border-primary/50 px-12 py-8 text-xl rounded-2xl font-semibold backdrop-blur-sm transition-all"
                    startContent={<Github className="w-6 h-6" />}
                    endContent={<ExternalLink className="w-5 h-5 opacity-50" />}
                  >
                    {locale === 'fa' ? 'مشاهده گیت‌هاب' : 'View GitHub'}
                  </Button>
                </MagneticButton>
              )}
            </motion.div>

            {/* Social Links Dock */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="pt-12"
            >
              <p className="text-sm text-white/40 uppercase tracking-wider mb-6">
                {locale === 'fa' ? 'شبکه‌های اجتماعی' : 'Connect with me'}
              </p>

              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((social, i) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.0 + i * 0.1, type: "spring" }}
                  >
                    <MagneticButton>
                      <a
                        href={social.href}
                        target={social.href.startsWith('mailto') ? undefined : '_blank'}
                        className="group relative"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 rounded-2xl glass-card border border-white/10 hover:border-primary/40 flex items-center justify-center transition-all"
                        >
                          <social.icon className={`w-7 h-7 text-white/70 transition-colors ${social.color}`} />
                        </motion.div>

                        {/* Label on Hover */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/50 pointer-events-none"
                        >
                          {social.label}
                        </motion.div>
                      </a>
                    </MagneticButton>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Decorative Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="pt-12"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-2xl"
                >
                  ⚡
                </motion.span>
                <span className="text-sm text-white/60">
                  {locale === 'fa'
                    ? 'معمولاً ظرف 24 ساعت پاسخ می‌دهم'
                    : 'I usually respond within 24 hours'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </LampContainer>
    </section>
  );
}
