"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface Language {
  name: string;
  level: string;
  flag?: string;
}

interface Stat {
  yearsOfExperience: string;
  projectsCompleted: string;
  clientsSatisfied: string;
  linesOfCode: string;
}

interface AboutMinimalProps {
  description: string;
  languages: Language[];
  skills: string[];
  stats: Stat;
}

export function AboutMinimal({ description, languages, skills, stats }: AboutMinimalProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';

  // Select key skills for minimal display (max 8)
  const keySkills = skills.slice(0, 8);

  return (
    <section className="py-32 md:py-40 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-white/40 font-medium">
              {locale === 'fa' ? 'درباره' : 'About'}
            </span>
          </motion.div>

          {/* Brief description - 2-3 sentences */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-16"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/80 leading-relaxed">
              {description.split('.').slice(0, 2).join('.')}
              <span className="text-white/60">.</span>
            </p>
          </motion.div>

          {/* Key skills as subtle badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-20"
          >
            {keySkills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.02,
                  opacity: 1
                }}
                transition-hover={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm text-white/60 hover:border-white/10 hover:text-white/80 transition-all cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>

          {/* Minimal stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: stats.yearsOfExperience, label: locale === 'fa' ? 'سال تجربه' : 'Years Experience' },
              { value: stats.projectsCompleted, label: locale === 'fa' ? 'پروژه' : 'Projects' },
              { value: stats.clientsSatisfied, label: locale === 'fa' ? 'مشتری' : 'Clients' },
              { value: stats.linesOfCode, label: locale === 'fa' ? 'خط کد' : 'Lines of Code' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + i * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-white/40">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
