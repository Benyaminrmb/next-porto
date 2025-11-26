"use client";

import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Mail, Phone, Github, Linkedin, Send, MapPin } from "lucide-react";

interface Contact {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

interface ContactShowcaseProps {
  contact: Contact;
}

export function ContactShowcase({ contact }: ContactShowcaseProps) {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: "from-red-500 to-orange-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone}`,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      value: contact.github.replace("https://github.com/", "@"),
      href: contact.github,
      color: "from-gray-700 to-gray-900",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: contact.linkedin.replace("https://linkedin.com/in/", "in/"),
      href: contact.linkedin,
      color: "from-blue-600 to-blue-800",
    },
  ];

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
      <BackgroundBeams />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-4">
            Let&apos;s Connect
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center gap-4 p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300 group"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-br ${method.color} group-hover:shadow-lg transition-shadow duration-300`}>
                  <div className="text-white">{method.icon}</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-400">{method.label}</p>
                  <p className="text-white font-medium">{method.value}</p>
                </div>
                <Send className="w-5 h-5 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Call to Action Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-3xl"
            />

            <div className="relative bg-neutral-900 rounded-3xl p-8 border border-neutral-800">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Ready to Start a Project?
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    I&apos;m available for freelance work, consulting, and full-time opportunities. Let&apos;s create something amazing together!
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <motion.a
                    href={`mailto:${contact.email}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Send Me an Email
                  </motion.a>

                  <motion.a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full text-center border-2 border-neutral-700 text-white px-8 py-4 rounded-xl font-medium hover:bg-neutral-800 transition-all duration-300"
                  >
                    View GitHub Profile
                  </motion.a>
                </div>

                <div className="pt-6 border-t border-neutral-800">
                  <p className="text-sm text-neutral-500 text-center">
                    Currently available for new opportunities
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
