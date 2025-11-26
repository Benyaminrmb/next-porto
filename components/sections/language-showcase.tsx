"use client";

import { motion } from "framer-motion";
import { Globe, Award } from "lucide-react";

interface Language {
  name: string;
  level: string;
  score?: string;
  flag?: string;
  details?: {
    reading: string;
    writing: string;
    speaking: string;
    listening: string;
  };
}

interface LanguageShowcaseProps {
  languages: Language[];
}

const skillLevels: { [key: string]: number } = {
  "Native": 100,
  "C2": 95,
  "C1": 85,
  "B2": 75,
  "B1": 65,
  "A2": 50,
  "A1": 35,
};

export function LanguageShowcase({ languages }: LanguageShowcaseProps) {
  return (
    <section className="relative py-20 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Globe className="w-10 h-10 text-blue-500" />
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
              Languages
            </h2>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {languages.map((language, index) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Animated gradient background */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{language.flag}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                          {language.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Award className="w-4 h-4 text-blue-500" />
                          <span className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            {language.level}
                          </span>
                          {language.score && (
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              (Score: {language.score})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Proficiency
                      </span>
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {skillLevels[language.level] || 100}%
                      </span>
                    </div>
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skillLevels[language.level] || 100}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative overflow-hidden"
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
                  </div>

                  {/* Detailed skills */}
                  {language.details && (
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(language.details).map(([skill, level], skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 + skillIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-white dark:bg-neutral-800 rounded-xl p-3 border border-neutral-200 dark:border-neutral-700"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 capitalize">
                              {skill}
                            </span>
                            <span className="text-xs font-bold text-blue-500">
                              {level}
                            </span>
                          </div>
                          <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skillLevels[level] || 50}%` }}
                              transition={{ duration: 1, delay: 0.8 + skillIndex * 0.1 }}
                              viewport={{ once: true }}
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
