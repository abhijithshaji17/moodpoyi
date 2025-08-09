"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const messages = [
  "Don't be shy, show me your face!",
  "I'm ready to judge your mood.",
  "Smile! Or don't. I'll know either way.",
  "Let's see what you've got.",
  "I'm the mood master.",
];

export default function WelcomeMessage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  return (
    <motion.h1
      className="text-4xl font-bold mb-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {message}
    </motion.h1>
  );
}
