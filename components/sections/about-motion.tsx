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
      className="relative min-h-screen bg-background py-32 overflow-hidden"
    >
      {/* Animated Background Elements with new color system */}
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
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(var(--gradient-start)) 0%, transparent 70%)"
          }}
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
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(var(--gradient-end)) 0%, transparent 70%)"
          }}
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                {t("badge")}
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text animate-gradient">
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl transform rotate-3" />
                <div className="relative bg-card p-2 rounded-3xl shadow-2xl transform -rotate-3 border border-border">
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
                          "hsl(var(--primary))",
                          "hsl(var(--accent))",
                          "hsl(var(--primary))",
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
                  <div className="p-3 bg-card rounded-full shadow-xl border border-border glow-purple">
                    <Icon className="w-6 h-6 text-primary" />
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
                className="text-3xl md:text-4xl font-bold text-foreground"
              >
                {name}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground leading-relaxed"
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
                      <div className="mt-1 p-1 bg-gradient-to-r from-primary to-accent rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <p className="text-foreground/80">{highlight}</p>
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
                  <div className="p-6 bg-card rounded-2xl border border-border shadow-lg group-hover:shadow-2xl group-hover:glow-purple transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary mb-3" />
                    <div className="stat-number text-3xl font-bold text-foreground" data-target={stat.target}>
                      0
                    </div>
                    <div className="text-sm text-primary font-medium">{stat.suffix}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Skills Progress Bars */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
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
                    <span className="text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{
                        background: "linear-gradient(to right, hsl(var(--gradient-start)), hsl(var(--gradient-end)))"
                      }}
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
