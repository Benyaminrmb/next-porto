"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Code2,
  Zap,
  Users,
  TrendingUp,
  Globe,
  Award,
  Sparkles,
  Brain,
  Heart,
  Rocket
} from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

interface Language {
  name: string;
  level: string;
  flag?: string;
  score?: string;
}

interface Stat {
  yearsOfExperience: string;
  projectsCompleted: string;
  clientsSatisfied: string;
  linesOfCode: string;
}

interface AboutCreativeProps {
  description: string;
  languages: Language[];
  skills: string[];
  stats: Stat;
}

export function AboutCreative({ description, languages, skills, stats }: AboutCreativeProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';

  const highlights = [
    {
      icon: Code2,
      title: locale === 'fa' ? 'کد تمیز' : 'Clean Code',
      description: locale === 'fa' ? 'استاندارد‌های کدنویسی' : 'Best practices',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Zap,
      title: locale === 'fa' ? 'کارایی' : 'Performance',
      description: locale === 'fa' ? 'بهینه‌سازی سرعت' : 'Speed optimized',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Heart,
      title: locale === 'fa' ? 'کاربر محور' : 'User-Centric',
      description: locale === 'fa' ? 'تجربه کاربری عالی' : 'Great UX',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Brain,
      title: locale === 'fa' ? 'یادگیری' : 'Learning',
      description: locale === 'fa' ? 'همیشه در حال رشد' : 'Always growing',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  // Organize skills by category
  const backendSkills = skills.filter(s =>
    ['PHP', 'Laravel', 'Filament', 'Livewire', 'REST API', 'Database Design'].includes(s)
  );
  const frontendSkills = skills.filter(s =>
    ['Nuxt.js', 'Next.js', 'React', 'Vue.js', 'JavaScript'].includes(s)
  );

  return (
    <section className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="section-container-wide relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-primary/20 mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-base font-bold text-primary uppercase tracking-wide">
              {locale === 'fa' ? 'درباره من' : 'About Me'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text leading-tight">
            {locale === 'fa' ? 'کدنویس، طراح، سازنده' : 'Coder, Designer, Builder'}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">

          {/* Bio Cell - Large (spans 2x2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 lg:col-span-4 md:row-span-2 glass-card p-8 group hover:border-primary/30 transition-all"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {locale === 'fa' ? 'داستان من' : 'My Story'}
                    </h3>
                    <p className="text-sm text-white/50">
                      {locale === 'fa' ? 'سفر من به عنوان توسعه‌دهنده' : 'My journey as a developer'}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="text-4xl"
                >
                  👨‍💻
                </motion.div>
              </div>

              <p className="text-white/70 leading-relaxed flex-grow mb-6">
                {description}
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 text-primary">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {locale === 'fa' ? 'تهران، ایران' : 'Tehran, Iran'}
                    </span>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="flex items-center gap-2 text-secondary">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {stats.yearsOfExperience} {locale === 'fa' ? 'سال تجربه' : 'Years Exp'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Languages Cell - Tall */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 lg:col-span-2 md:row-span-2 glass-card p-6 group hover:border-primary/30 transition-all"
          >
            <div className="h-full flex flex-col">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {locale === 'fa' ? 'زبان‌ها' : 'Languages'}
              </h3>

              <div className="space-y-6 flex-grow">
                {languages.map((lang, i) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {lang.flag && <span className="text-3xl">{lang.flag}</span>}
                        <div>
                          <p className="text-sm font-semibold text-white">{lang.name}</p>
                          <p className="text-xs text-white/50">{lang.level}</p>
                        </div>
                      </div>
                      {lang.score && (
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{lang.score}</p>
                          <p className="text-xs text-white/50">Score</p>
                        </div>
                      )}
                    </div>

                    {/* Proficiency Bar */}
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: lang.level === 'Native' ? '100%' : lang.level === 'C2' ? '95%' : '80%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                        className={`h-full bg-gradient-to-r ${i === 0 ? 'from-green-500 to-emerald-500' : 'from-primary to-blue-500'}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid - Wide (spans 4 columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-4 lg:col-span-4 glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {locale === 'fa' ? 'ویژگی‌های کلیدی' : 'Core Values'}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all cursor-pointer overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${highlight.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <highlight.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">{highlight.title}</h4>
                    <p className="text-xs text-white/50">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Marquee - Wide (spans full width) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-4 lg:col-span-6 glass-card p-6 overflow-hidden"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              {locale === 'fa' ? 'مهارت‌های فنی' : 'Technical Skills'}
            </h3>

            {/* Backend Skills Marquee */}
            <div className="mb-4">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                {locale === 'fa' ? 'بک‌اند' : 'Backend'}
              </p>
              <div className="relative overflow-hidden">
                <motion.div
                  animate={{
                    x: [0, -1000],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 20,
                      ease: "linear",
                    },
                  }}
                  className="flex gap-4"
                >
                  {[...backendSkills, ...backendSkills, ...backendSkills].map((skill, i) => (
                    <div
                      key={i}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20 whitespace-nowrap"
                    >
                      <span className="text-sm font-semibold text-white/80">{skill}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Frontend Skills Marquee */}
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                {locale === 'fa' ? 'فرانت‌اند' : 'Frontend'}
              </p>
              <div className="relative overflow-hidden">
                <motion.div
                  animate={{
                    x: [-1000, 0],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 18,
                      ease: "linear",
                    },
                  }}
                  className="flex gap-4"
                >
                  {[...frontendSkills, ...frontendSkills, ...frontendSkills].map((skill, i) => (
                    <div
                      key={i}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-secondary/10 to-purple-500/10 border border-secondary/20 whitespace-nowrap"
                    >
                      <span className="text-sm font-semibold text-white/80">{skill}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
