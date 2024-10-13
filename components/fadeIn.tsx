"use client";

import { motion } from "framer-motion";

export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function FadeIn({
  children,
  className = "",
  duration = 0.5,
  delay = 0,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: delay,
          duration: duration,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
}
