"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Code2,
  Database,
  Globe,
  Layers,
  Palette,
  Rocket,
  Server,
  Zap,
} from "lucide-react";

interface SkillsShowcaseProps {
  skills: string[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  PHP: <Code2 className="w-6 h-6" />,
  Laravel: <Server className="w-6 h-6" />,
  "Nuxt.js": <Globe className="w-6 h-6" />,
  "Next.js": <Globe className="w-6 h-6" />,
  React: <Layers className="w-6 h-6" />,
  JavaScript: <Code2 className="w-6 h-6" />,
  "Vue.js": <Palette className="w-6 h-6" />,
  "REST API": <Zap className="w-6 h-6" />,
  "Database Design": <Database className="w-6 h-6" />,
  Webpack: <Rocket className="w-6 h-6" />,
  SEO: <Globe className="w-6 h-6" />,
  "PWA Development": <Rocket className="w-6 h-6" />,
};

const getSkillIcon = (skill: string) => {
  return iconMap[skill] || <Code2 className="w-6 h-6" />;
};

const Skeleton = ({ skill }: { skill: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 to-neutral-100 dark:to-neutral-800 border border-transparent dark:border-white/[0.1] relative overflow-hidden">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="text-neutral-700 dark:text-neutral-300">
        {getSkillIcon(skill)}
      </div>
    </motion.div>
    <motion.div
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
      style={{
        backgroundSize: "200% 200%",
      }}
    />
  </div>
);

export function SkillsShowcase({ skills }: SkillsShowcaseProps) {
  const items = skills.map((skill, i) => ({
    title: skill,
    description: `Proficient in ${skill}`,
    header: <Skeleton skill={skill} />,
    icon: getSkillIcon(skill),
    className: i === 3 || i === 6 ? "md:col-span-2" : "",
  }));

  return (
    <section id="skills" className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent mb-4">
            Skills & Expertise
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <BentoGrid className="max-w-6xl mx-auto">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                  className={item.className}
                />
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}
