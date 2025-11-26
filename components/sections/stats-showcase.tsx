"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Code2, Users, Award, TrendingUp } from "lucide-react";

interface StatsShowcaseProps {
  stats: {
    yearsOfExperience: string;
    projectsCompleted: string;
    clientsSatisfied: string;
    linesOfCode: string;
  };
}

function Counter({ value, duration = 2 }: { value: string; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Extract number from string like "6+" or "100K+"
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');

    const controls = animate(0, numericValue, {
      duration,
      onUpdate(value) {
        if (node) {
          node.textContent = Math.round(value) + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return <span ref={nodeRef} />;
}

export function StatsShowcase({ stats }: StatsShowcaseProps) {
  const statsData = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: stats.yearsOfExperience,
      label: "Years Experience",
      color: "from-blue-500 to-cyan-500",
      delay: 0,
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      value: stats.projectsCompleted,
      label: "Projects Completed",
      color: "from-purple-500 to-pink-500",
      delay: 0.1,
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: stats.clientsSatisfied,
      label: "Happy Clients",
      color: "from-green-500 to-emerald-500",
      delay: 0.2,
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: stats.linesOfCode,
      label: "Lines of Code",
      color: "from-orange-500 to-red-500",
      delay: 0.3,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-black dark:to-neutral-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent mb-4">
            Achievements
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`mb-4 p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
                  >
                    {stat.icon}
                  </motion.div>

                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent mb-2">
                    <Counter value={stat.value} duration={2} />
                  </div>

                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-medium text-center">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
