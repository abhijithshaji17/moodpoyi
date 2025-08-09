"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AnimatedText({ text }: { text: string }) {
  return (
    <motion.p
      className="text-xl font-semibold mt-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {text}
    </motion.p>
  );
}
