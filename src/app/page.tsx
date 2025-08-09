"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import FaceDetection from "@/components/FaceDetection";
import Visualizer from "@/components/Visualizer";
import WelcomeMessage from "@/components/WelcomeMessage";

const emotionColors: Record<string, string> = {
  happy: "#FFD700", // Gold
  sad: "#1E90FF", // DodgerBlue
  angry: "#DC143C", // Crimson
  surprised: "#9932CC", // DarkOrchid
  neutral: "#808080", // Gray
  fearful: "#FF4500", // OrangeRed
  disgusted: "#008000", // Green
  sexy: "#FF69B4", // HotPink
};

const emotionEmojis: Record<string, string> = {
  happy: "😄",
  sad: "😢",
  angry: "😠",
  surprised: "😮",
  neutral: "😐",
  fearful: "😨",
  disgusted: "🤢",
  sexy: "😏",
};

export default function HomePage() {
  const [emotion, setEmotion] = useState<string | null>(null);
  const [song, setSong] = useState<string | null>(null);

  return (
    <motion.main
      className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
      animate={{ backgroundColor: emotion ? emotionColors[emotion] : "#000000" }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <div className="absolute top-4 right-4">
        <Link href="/how-it-works">
          <motion.button
            className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            How It Works
          </motion.button>
        </Link>
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Visualizer emotion={emotion} />
      </div>

      {/* Title */}
      <WelcomeMessage />

      {/* Webcam + Emotion Detection */}
      <FaceDetection
        onEmotionDetected={(emo, songName) => {
          setEmotion(emo);
          setSong(songName);
        }}
      />

      {/* Detected Emotion */}
      {emotion && (
        <div className="mt-6 text-center">
          <AnimatedText text={`You look ${emotion} ${emotionEmojis[emotion]}`} />
          {song && <AnimatedText text={`Playing: ${song}`} />}
        </div>
      )}
    </motion.main>
  );
}
