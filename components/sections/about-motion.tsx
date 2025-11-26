"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Sparkles, Code2, Rocket, Heart, Coffee, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

interface AboutMotionProps {
  name: string;
  description: string;
  highlights?: string[];
}

export function AboutMotion({ name, description, highlights }: AboutMotionProps) {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Image 3D rotation on scroll
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top center+=100",
          end: "bottom center",
          scrub: 1,
        },
        rotateY: -30,
        rotateX: 10,
        scale: 0.8,
        opacity: 0,
      });

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll(".stat-number");
      statNumbers?.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target") || "0");
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top bottom-=100",
          },
          textContent: 0,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: function () {
            const value = Math.ceil(parseFloat(stat.textContent || "0"));
            stat.textContent = value.toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Code2, label: t("stats.experience"), value: "6+", target: 6, suffix: "+" },
    { icon: Rocket, label: t("stats.projects"), value: "15+", target: 15, suffix: "+" },
    { icon: Heart, label: t("stats.clients"), value: "10+", target: 10, suffix: "+" },
    { icon: Coffee, label: t("stats.code"), value: "100K+", target: 100, suffix: "K+" },
  ];

  const skills = [
    { name: "Laravel", level: 95 },
    { name: "PHP", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Vue.js / Nuxt.js", level: 85 },
    { name: "React / Next.js", level: 80 },
    { name: "Filament", level: 90 },
    { name: "API Development", level: 95 },
    { name: "Database Design", level: 90 },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-white dark:bg-black py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {t("badge")}
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Image with 3D Effect */}
          <ScrollReveal direction="left">
            <div ref={imageRef} className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl transform rotate-3" />
                <div className="relative bg-white dark:bg-neutral-900 p-2 rounded-3xl shadow-2xl transform -rotate-3">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src="https://github.com/benyaminrmb.png"
                      alt={name}
                      fill
                      className="object-cover"
                    />
                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 border-4 border-transparent rounded-2xl"
                      animate={{
                        borderColor: [
                          "rgba(147, 51, 234, 0.5)",
                          "rgba(59, 130, 246, 0.5)",
                          "rgba(236, 72, 153, 0.5)",
                          "rgba(147, 51, 234, 0.5)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating Icons */}
              {[Code2, Rocket, Zap, Heart].map((Icon, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.5,
                    repeat: Infinity,
                  }}
                  className="absolute"
                  style={{
                    top: `${20 + index * 20}%`,
                    [index % 2 === 0 ? "left" : "right"]: "-10%",
                  }}
                >
                  <div className="p-3 bg-white dark:bg-neutral-900 rounded-full shadow-xl border border-neutral-200 dark:border-neutral-800">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* About Text */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100"
              >
                {name}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
              >
                {description}
              </motion.p>

              {/* Highlights */}
              {highlights && highlights.length > 0 && (
                <div className="space-y-3">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 p-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300">{highlight}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Stats Grid */}
        <ScrollReveal delay={0.2}>
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <Icon className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                    <div className="stat-number text-3xl font-bold text-neutral-900 dark:text-neutral-100" data-target={stat.target}>
                      0
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">{stat.suffix}</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Skills Progress Bars */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t("skills")}
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {skill.name}
                    </span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full relative overflow-hidden"
                    >
                      <motion.div
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
