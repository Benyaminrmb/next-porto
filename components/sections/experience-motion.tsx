"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Briefcase, Calendar, MapPin, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
}

interface ExperienceMotionProps {
  experiences: Experience[];
}

export function ExperienceMotion({ experiences }: ExperienceMotionProps) {
  const t = useTranslations("experience");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-neutral-50 via-blue-50/20 to-neutral-50 dark:from-neutral-950 dark:via-blue-950/10 dark:to-neutral-950 py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 15 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6"
            >
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {t("badge")}
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h2>

            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600"
            />
          </div>

          {/* Experience Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <ScrollReveal
                  key={exp.id}
                  direction={isEven ? "left" : "right"}
                  delay={0.1}
                >
                  <div className={`relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Timeline Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
                      viewport={{ once: true }}
                      className="absolute left-8 md:left-1/2 w-6 h-6 -ml-3 z-10"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(147, 51, 234, 0.5)",
                            "0 0 0 10px rgba(147, 51, 234, 0)",
                            "0 0 0 0 rgba(147, 51, 234, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-full border-4 border-white dark:border-neutral-950"
                      />
                    </motion.div>

                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-3rem)] ${isEven ? "md:pr-8 pl-20 md:pl-0" : "md:pl-8 pl-20 md:pr-0"}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ type: "spring" as const, stiffness: 300 }}
                        className="p-6 md:p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group"
                      >
                        {/* Gradient Border on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        <div className="absolute inset-[2px] bg-white dark:bg-neutral-900 rounded-2xl -z-10" />

                        {/* Icon Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                          <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                            {exp.company}
                          </span>
                        </div>

                        {/* Job Title */}
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                          {exp.title}
                        </h3>

                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <ul className="space-y-2 mb-4">
                          {exp.description.map((desc, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                            >
                              <div className="mt-2 w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0" />
                              <span>{desc}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.1 }}
                                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 rounded-full"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        )}

                        {/* Floating Number */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 0.1 }}
                          viewport={{ once: true }}
                          className="absolute -top-4 -right-4 text-8xl font-bold text-neutral-900 dark:text-neutral-100"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
