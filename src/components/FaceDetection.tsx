"use client";

import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { Howl } from "howler";

interface Props {
  onEmotionDetected: (emotion: string, song: string) => void;
}

const emotionMap: Record<string, { opposite: string; file: string }> = {
  happy: { opposite: "sad", file: "/assets/Sad.mp3" },
  sad: { opposite: "happy", file: "/assets/Happy.mp3" },
  angry: { opposite: "calm", file: "/assets/Energetic.mp3" },
  surprised: { opposite: "relaxed", file: "/assets/Romantic.mp3" },
  neutral: { opposite: "energetic", file: "/assets/Energetic.mp3" },
  fearful: { opposite: "confident", file: "/assets/Happy.mp3" },
  disgusted: { opposite: "pleasant", file: "/assets/Romantic.mp3" },
  sexy: { opposite: "romantic", file: "/assets/Romantic.mp3" },
};

export default function FaceDetection({ onEmotionDetected }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentSound = useRef<Howl | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  };

  const detectEmotion = async () => {
    if (videoRef.current) {
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detections && detections.expressions) {
        const sorted = Object.entries(detections.expressions).sort(
          (a, b) => b[1] - a[1]
        );
        let topEmotion = sorted[0][0] as keyof typeof emotionMap;

        if (topEmotion === 'happy') {
          topEmotion = 'sexy';
        }

        if (emotionMap[topEmotion]) {
          const opposite = emotionMap[topEmotion].opposite;
          const songFile = emotionMap[topEmotion].file;

          // Stop current song
          if (currentSound.current) {
            currentSound.current.stop();
          }

          // Play new song
          currentSound.current = new Howl({
            src: [songFile],
            html5: true,
          });
          currentSound.current.play();

          onEmotionDetected(topEmotion, `${opposite} (${songFile})`);
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(detectEmotion, 3000); // every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width={320}
        height={240}
        className="rounded-full border-4 border-pink-500 shadow-lg"
      />
    </div>
  );
}
