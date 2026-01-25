"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Code, Users, Briefcase, Trophy } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

interface Stat {
  yearsOfExperience: string;
  projectsCompleted: string;
  clientsSatisfied: string;
  linesOfCode: string;
}

interface StatsCreativeProps {
  stats: Stat;
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsCreative({ stats }: StatsCreativeProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';

  // Helper function to convert Persian/Arabic numerals to English
  const parseNumber = (str: string): number => {
    const persianToEnglish = str
      .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString())
      .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
    return parseInt(persianToEnglish) || 0;
  };

  const statsData = [
    {
      icon: Trophy,
      value: parseNumber(stats.yearsOfExperience),
      suffix: '+',
      label: locale === 'fa' ? 'سال تجربه' : 'Years Experience',
      color: 'from-yellow-500 to-orange-500',
      glow: 'shadow-yellow-500/50',
    },
    {
      icon: Briefcase,
      value: parseNumber(stats.projectsCompleted),
      suffix: '+',
      label: locale === 'fa' ? 'پروژه تکمیل شده' : 'Projects Completed',
      color: 'from-primary to-cyan-500',
      glow: 'shadow-primary/50',
    },
    {
      icon: Users,
      value: parseNumber(stats.clientsSatisfied),
      suffix: '+',
      label: locale === 'fa' ? 'مشتری راضی' : 'Happy Clients',
      color: 'from-secondary to-purple-500',
      glow: 'shadow-secondary/50',
    },
    {
      icon: Code,
      value: 100,
      suffix: 'K+',
      label: locale === 'fa' ? 'خط کد' : 'Lines of Code',
      color: 'from-green-500 to-emerald-500',
      glow: 'shadow-green-500/50',
    },
  ];

  return (
    <section className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Animated Background with Meteors Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Meteor Lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -100, y: -100, opacity: 0 }}
            animate={{
              x: [0, 1000],
              y: [0, 800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-white to-transparent"
            style={{
              left: `${10 + i * 15}%`,
              top: `${5 + i * 10}%`,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-primary/20 mb-8">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-base font-bold text-primary uppercase tracking-wide">
              {locale === 'fa' ? 'آمار و ارقام' : 'By the Numbers'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text leading-tight">
            {locale === 'fa' ? 'سفری که ساختم' : 'A Snapshot of My Journey'}
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, i) => (
            <CardContainer
              key={i}
              containerClassName="py-0"
              className="w-full"
            >
              <CardBody className="w-full h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Connection Lines */}
                  {i < statsData.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                      className="hidden lg:block absolute top-1/2 -right-8 w-16 h-px bg-gradient-to-r from-white/20 to-transparent origin-left"
                    />
                  )}

                  <CardItem
                    translateZ={50}
                    className="w-full"
                  >
                    <div className="glass-card p-8 group hover:border-primary/40 transition-all">
                      {/* Animated Float Effect */}
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {/* Icon */}
                        <CardItem translateZ={75}>
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 group-hover:shadow-2xl ${stat.glow} transition-all`}
                          >
                            <stat.icon className="w-8 h-8 text-white" />
                          </motion.div>
                        </CardItem>

                        {/* Number */}
                        <CardItem translateZ={100} className="mb-2">
                          <div className="text-5xl md:text-6xl font-bold gradient-text">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2 + i * 0.2} />
                          </div>
                        </CardItem>

                        {/* Label */}
                        <CardItem translateZ={60}>
                          <p className="text-white/60 font-medium">
                            {stat.label}
                          </p>
                        </CardItem>
                      </motion.div>

                      {/* Sparkle Effect on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {[...Array(3)].map((_, j) => (
                          <motion.div
                            key={j}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                            transition={{
                              duration: 1.5,
                              delay: j * 0.2,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                            className={`absolute w-2 h-2 rounded-full bg-gradient-to-br ${stat.color}`}
                            style={{
                              left: `${20 + j * 30}%`,
                              top: `${15 + j * 25}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </CardItem>
                </motion.div>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 glass-card px-8 py-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.div>
              <span className="text-white/70 font-medium">
                {locale === 'fa' ? 'همیشه در حال رشد' : 'Always Growing'}
              </span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                🚀
              </motion.div>
              <span className="text-white/70 font-medium">
                {locale === 'fa' ? 'آماده برای چالش‌های جدید' : 'Ready for New Challenges'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
