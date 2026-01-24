"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface ContactMotionProps {
  email: string;
  phone?: string;
  location?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export function ContactMotion({
  email,
  phone,
  location,
  social,
}: ContactMotionProps) {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      color: "from-purple-600 to-blue-600",
    },
    {
      icon: Phone,
      label: "Phone",
      value: phone || "+98 XXX XXX XXXX",
      href: `tel:${phone}`,
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: MapPin,
      label: "Location",
      value: location || "Tehran, Iran",
      href: "#",
      color: "from-cyan-600 to-teal-600",
    },
  ];

  const socialLinks = [
    { icon: Github, href: social?.github || "https://github.com/benyaminrmb", label: "GitHub" },
    { icon: Linkedin, href: social?.linkedin || "https://linkedin.com/in/benyaminrmb", label: "LinkedIn" },
    { icon: Twitter, href: social?.twitter || "https://twitter.com/benyaminrmb", label: "Twitter" },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-gradient-to-b from-neutral-50 via-purple-50/20 to-neutral-50 dark:from-neutral-950 dark:via-purple-950/10 dark:to-neutral-950 py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
            animate={{
              y: ["0vh", "100vh"],
              x: [
                `${Math.random() * 100}vw`,
                `${Math.random() * 100}vw`,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 15 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {t("badge")}
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h2>

            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              {/* Contact Methods */}
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={index}
                    href={method.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="group flex items-center gap-6 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className={`p-4 bg-gradient-to-r ${method.color} rounded-xl`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                        {method.label}
                      </div>
                      <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        {method.value}
                      </div>
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      →
                    </motion.div>
                  </motion.a>
                );
              })}

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  {t("social")}
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <MagneticButton key={index}>
                        <motion.a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, type: "spring" as const }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                          aria-label={social.label}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.a>
                      </MagneticButton>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring" as const, stiffness: 300 }}
              className="p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl relative overflow-hidden"
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="absolute inset-[2px] bg-white dark:bg-neutral-900 rounded-2xl -z-10" />

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    {t("form.name")}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 transition-all"
                    placeholder={t("form.namePlaceholder")}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    {t("form.email")}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 transition-all"
                    placeholder={t("form.emailPlaceholder")}
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    {t("form.message")}
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 transition-all resize-none"
                    placeholder={t("form.messagePlaceholder")}
                  />
                </div>

                {/* Submit Button */}
                <MagneticButton>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          <span>{t("form.success")}</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <span>{t("form.submit")}</span>
                          <Send className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </MagneticButton>
              </form>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
