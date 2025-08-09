"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <motion.h1
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How It Works
      </motion.h1>

      <motion.div
        className="max-w-2xl text-lg space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p>
          This application uses your webcam to analyze your facial expression in
          real-time. Here a step-by-step breakdown of the process:
        </p>

        <ol className="list-decimal list-inside space-y-4 bg-gray-800 p-6 rounded-lg">
          <li>
            <strong>Model Loading:</strong> When you first load the page, we load
            pre-trained machine learning models from `face-api.js`. These models
            are capable of detecting faces and recognizing facial expressions.
          </li>
          <li>
            <strong>Face Detection:</strong> Once the models are loaded, we use
            your webcam to capture video. Every few seconds, we take a snapshot
            of the video and run it through the face detection model to locate
            your face.
          </li>
          <li>
            <strong>Emotion Recognition:</strong> After a face is detected, we
            use the facial expression recognition model to analyze your
            expression. The model returns a probability for each of the seven
            basic emotions: happy, sad, angry, surprised, neutral, fearful, and
            disgusted.
          </li>
          <li>
            <strong>Opposite Music Selection:</strong> We take the emotion with
            the highest probability and then select a song that has the
            opposite mood. For example, if you look happy, we play a sad song.
            This is based on a predefined map of emotions and their opposites.
          </li>
          <li>
            <strong>3D Visualization:</strong> The 3D dancer in the background
            reacts to your detected emotion. The dance style and speed change to
            match the mood of the music, creating a more immersive experience.
          </li>
        </ol>

        <p>
          The entire process runs locally in your browser, so your camera data
          is never sent to a server. Your privacy is important to us.
        </p>
      </motion.div>

      <Link href="/">
        <motion.button
          className="mt-8 px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Try It Out!
        </motion.button>
      </Link>
    </main>
  );
}
