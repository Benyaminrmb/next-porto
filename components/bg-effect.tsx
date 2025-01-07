"use client";
import { getData } from '@/lib/data';
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";

export async function BgEffect() {
  const data = await getData();
  return (
    <AuroraBackground>
      <motion.div
        initial={{opacity: 0.0, y: 40}}
        whileInView={{opacity: 1, y: 0}}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Hi, I'm {data.name}
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          A passionate web developer and designer crafting digital experiences.
        </div>
        <a
          href="#projects"
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-6 py-3 text-lg hover:bg-opacity-80 transition-all"
        >
          View My Work
        </a>
      </motion.div>
    </AuroraBackground>
  );
}