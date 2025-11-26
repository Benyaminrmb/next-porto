"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

interface WorkExperience {
  title: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  gpa: string;
}

interface ExperienceTimelineProps {
  workExperience: WorkExperience[];
  education: Education[];
}

export function ExperienceTimeline({
  workExperience,
  education,
}: ExperienceTimelineProps) {
  return (
    <section id="experience" className="relative min-h-screen bg-white dark:bg-black py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent mb-4">
            Experience & Education
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-500" />
              Work Experience
            </h3>

            <div className="relative border-l-2 border-blue-500 dark:border-blue-400 ml-4 md:ml-8">
              {workExperience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 pb-12 group"
                >
                  {/* Timeline dot */}
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className="absolute left-0 top-0 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full -translate-x-[9px] group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300"
                  />

                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                          {job.title}
                        </h4>
                        <p className="text-blue-500 dark:text-blue-400 font-medium">
                          {job.company}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 mt-2 md:mt-0 text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {job.duration}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, respIndex) => (
                        <motion.li
                          key={respIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: respIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                        >
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{resp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-purple-500" />
              Education
            </h3>

            <div className="relative border-l-2 border-purple-500 dark:border-purple-400 ml-4 md:ml-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 pb-12 group"
                >
                  {/* Timeline dot */}
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className="absolute left-0 top-0 w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full -translate-x-[9px] group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300"
                  />

                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div>
                        <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                          {edu.degree}
                        </h4>
                        <p className="text-purple-500 dark:text-purple-400 font-medium">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 mt-2 md:mt-0 text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {edu.duration}
                        </div>
                      </div>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      GPA: <span className="font-semibold">{edu.gpa}</span>
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
