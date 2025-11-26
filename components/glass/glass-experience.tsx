'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

interface Experience {
  title: string;
  company?: string;
  institution?: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  type?: 'work' | 'education';
}

interface GlassExperienceProps {
  experiences: Experience[];
}

export function GlassExperience({ experiences }: GlassExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.endDate === 'Present' ? new Date() : a.endDate);
    const dateB = new Date(b.endDate === 'Present' ? new Date() : b.endDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Experience & Education
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 opacity-30" />

          <div className="space-y-12">
            {sortedExperiences.map((exp, index) => {
              const isWork = exp.company !== undefined;
              const Icon = isWork ? Briefcase : GraduationCap;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    className="absolute left-8 md:left-1/2 w-16 h-16 -ml-8 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`ml-24 md:ml-0 md:w-5/12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3 text-white/60 text-sm justify-start md:justify-end">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>

                    <div className="text-lg text-purple-400 mb-1">
                      {isWork ? exp.company : exp.institution}
                    </div>

                    <div className="text-sm text-white/60 mb-4">{exp.location}</div>

                    <p className="text-white/70 leading-relaxed">{exp.description}</p>

                    {/* Type badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                      className={`inline-block mt-4 px-3 py-1 rounded-lg ${
                        isWork
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      } text-xs font-medium`}
                    >
                      {isWork ? 'Work Experience' : 'Education'}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
