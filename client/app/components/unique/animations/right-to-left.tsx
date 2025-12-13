"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SlideFromRightWrapperProps = {
  children: ReactNode;
  delay?: number;
};

export default function SlideFromRightWrapper({
  children,
  delay = 0,
}: SlideFromRightWrapperProps) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
