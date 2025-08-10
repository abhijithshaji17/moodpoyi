"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import FaceDetection from "@/components/FaceDetection";
import WelcomeMessage from "@/components/WelcomeMessage";

const emotionColors: Record<string, string> = {
  happy: "#FFD700", // Gold
  sad: "#1E90FF", // DodgerBlue
  angry: "#DC143C", // Crimson
  surprised: "#9932CC", // DarkOrchid
  neutral: "#808080", // Gray
  fearful: "#FF4500", // OrangeRed
  disgusted: "#008000", // Green
};

const emotionEmojis: Record<string, string> = {
  happy: "😄",
  sad: "😢",
  angry: "😠",
  surprised: "😮",
  neutral: "😐",
  fearful: "😨",
  disgusted: "🤢",
};

export default function HomePage() {
  // State hooks
  const [emotion, setEmotion] = useState<string | null>(null);
  const [song, setSong] = useState<string | null>(null);
  const [musicStopped, setMusicStopped] = useState(false);
  // Ref for FaceDetection controls
  const faceDetectionRef = useRef<{ stopMusic: () => void }>(null);

  // Handler for emotion detection callback
  const handleEmotionDetected = (emo: string, songName: string) => {
    setEmotion(emo);
    setSong(songName);
  };

  const handleStopMusic = () => {
    setMusicStopped(true);
    faceDetectionRef.current?.stopMusic();
  };

  const handleResumeMusic = () => {
    setMusicStopped(false);
  };

  return (
    <motion.main
      className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
      animate={{
        backgroundColor: emotion ? emotionColors[emotion] : "#000000",
      }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {/* Top-right navigation button */}
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
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 transform -skew-y-6 -skew-x-6"></div>
      </div>

      {/* Title / Welcome message */}
      <WelcomeMessage />

      {/* Webcam + Emotion Detection */}

      <FaceDetection
        ref={faceDetectionRef}
        onEmotionDetected={handleEmotionDetected}
        musicStopped={musicStopped}
      />

      {/* Stop/Resume Music Buttons */}
      {musicStopped ? (
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors"
          onClick={handleResumeMusic}
        >
          Resume Music
        </button>
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
          onClick={handleStopMusic}
        >
          Stop Music
        </button>
      )}

      {/* Detected Emotion Display */}
      {emotion && (
        <div className="mt-6 text-center">
          <AnimatedText
            text={`You look ${emotion} ${emotionEmojis[emotion]}`}
          />
          {song && <AnimatedText text={`Playing: ${song}`} />}
        </div>
      )}
    </motion.main>
  );
}
