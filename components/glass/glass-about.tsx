'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Rocket, Users, Award } from 'lucide-react';

interface GlassAboutProps {
  name: string;
  description: string;
  highlights: string[];
}

const features = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable and scalable code',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimized for speed and efficiency',
  },
  {
    icon: Users,
    title: 'Team Player',
    description: 'Collaborative and communicative',
  },
  {
    icon: Award,
    title: 'Best Practices',
    description: 'Following industry standards',
  },
];

export function GlassAbout({ name, description, highlights }: GlassAboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Passionate developer crafting exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Main About Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
            <p className="text-white/70 leading-relaxed mb-6">{description}</p>

            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mt-2" />
                  <p className="text-white/80 text-sm">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Years Experience', value: '6+' },
              { label: 'Projects Completed', value: '50+' },
              { label: 'Happy Clients', value: '30+' },
              { label: 'Code Commits', value: '10K+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
