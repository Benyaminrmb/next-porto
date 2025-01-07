"use client";

import { motion } from "framer-motion";

export function HeroSection({ data }: { data: { name: string; description: string } }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Hi, I'm {data.name}</h1>
        <p className="text-lg md:text-2xl text-slate-300">{data.description}</p>
        <a
          href="#projects"
          className="mt-8 inline-block px-6 py-3 bg-white text-slate-900 rounded-lg text-lg font-semibold hover:bg-slate-200 transition-colors"
        >
          View My Work
        </a>
      </motion.div>
    </div>
  );
}