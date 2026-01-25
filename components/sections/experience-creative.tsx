"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Briefcase, GraduationCap, MapPin, Calendar, Sparkles } from "lucide-react";

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
}

interface ExperienceCreativeProps {
  workExperience: Experience[];
  education: Experience[];
}

export function ExperienceCreative({ workExperience, education }: ExperienceCreativeProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const allItems = [
    ...workExperience.map(item => ({ ...item, type: 'work' as const })),
    ...education.map(item => ({ ...item, type: 'education' as const }))
  ].sort((a, b) => b.id - a.id); // Sort by ID descending (newest first)

  return (
    <section ref={ref} className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Spotlight Effect */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl"
        />

        {/* Beam Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,234,212,0.05),transparent_50%)]" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 md:mb-28"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-primary/20 mb-8">
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-base font-bold text-primary uppercase tracking-wide">
              {locale === 'fa' ? 'سفر حرفه‌ای' : 'Career Journey'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 leading-tight">
            {locale === 'fa' ? 'تجربه و آموزش' : 'Experience & Education'}
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            {locale === 'fa'
              ? 'مسیری که طی کردم تا به اینجا برسم'
              : 'The path I took to get where I am today'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-secondary to-primary origin-top"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {allItems.map((item, index) => {
              const isWork = item.type === 'work';
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-16 gap-8`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", duration: 0.6, delay: index * 0.1 + 0.2 }}
                      className="relative"
                    >
                      {/* Dot Glow */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                        className={`absolute inset-0 rounded-full blur-md ${isWork ? 'bg-primary' : 'bg-secondary'}`}
                      />

                      {/* Dot */}
                      <div className={`relative w-5 h-5 rounded-full border-4 border-background ${isWork ? 'bg-primary' : 'bg-secondary'} shadow-lg ${isWork ? 'shadow-primary/50' : 'shadow-secondary/50'}`}>
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden md:block flex-1" />

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="flex-1 glass-card p-6 md:p-8 group hover:border-primary/40 transition-all ml-16 md:ml-0"
                  >
                    {/* Card Icon & Type Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${isWork ? 'from-primary to-cyan-500' : 'from-secondary to-purple-500'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        {isWork ? (
                          <Briefcase className="w-6 h-6 text-white" />
                        ) : (
                          <GraduationCap className="w-6 h-6 text-white" />
                        )}
                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${isWork ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary/10 text-secondary border border-secondary/20'}`}>
                        {isWork ? (locale === 'fa' ? 'کاری' : 'Work') : (locale === 'fa' ? 'تحصیلی' : 'Education')}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                      {item.title}
                    </h3>

                    {/* Company/School */}
                    <p className="text-lg text-white/80 font-semibold mb-3">
                      {item.company}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/50">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                      {item.description.map((desc, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
                          className="text-white/70 leading-relaxed flex items-start gap-2 text-sm"
                        >
                          <span className="text-primary mt-1.5">▸</span>
                          <span>{desc}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {item.technologies.map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.4 + i * 0.03 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white/60 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {/* Beam Connection Effect */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                      className={`absolute top-1/2 ${isEven ? 'left-0 -translate-x-full origin-right' : 'right-0 translate-x-full origin-left'} hidden md:block w-16 h-px bg-gradient-to-r ${isEven ? 'from-primary/50 to-transparent' : 'from-transparent to-primary/50'}`}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Decorative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-white/70 font-medium">
              {locale === 'fa' ? 'و داستان ادامه دارد...' : 'And the journey continues...'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
