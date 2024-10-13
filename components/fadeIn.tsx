"use client";

import { motion } from "framer-motion";
import React from "react";

export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  tagKey?: keyof React.JSX.IntrinsicElements;
}

export default function FadeIn({
  children,
  className = "",
  duration = 0.5,
  delay = 0,
  tagKey = "div",
}: FadeInProps) {
  const MotionComponent = motion.create(tagKey);
  return (
    <MotionComponent
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
    </MotionComponent>
  );
}
