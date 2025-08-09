"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import FaceDetection from "@/components/FaceDetection";
import Visualizer from "@/components/Visualizer";

export default function HomePage() {
  const [emotion, setEmotion] = useState<string | null>(null);
  const [song, setSong] = useState<string | null>(null);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Visualizer emotion={emotion} />
      </div>

      {/* Title */}
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Emotion → Opposite Music
      </motion.h1>

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
          <AnimatedText text={`You look ${emotion}`} />
          {song && <AnimatedText text={`Playing: ${song}`} />}
        </div>
      )}
    </main>
  );
}
