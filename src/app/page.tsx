// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';

const FaceDetection = dynamic(() => import('../components/FaceDetection'), {
  ssr: false, // This is the crucial line.
});

export default function Home() {
  return (
    <main>
      <h1>Moodpoyi</h1>
      <FaceDetection />
    </main>
  );
}