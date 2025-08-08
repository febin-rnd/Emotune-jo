"use client"

import React from "react";
import { motion } from "framer-motion";

const EMOTION_GRADIENTS = {
  joy: "from-rose-200 via-yellow-200 to-orange-200",
  happy: "from-rose-200 via-yellow-200 to-orange-200",
  sad: "from-indigo-200 via-blue-200 to-slate-300",
  lonely: "from-gray-300 via-slate-400 to-gray-400",
  angry: "from-red-300 via-orange-300 to-yellow-300",
  peaceful: "from-green-200 via-teal-200 to-cyan-200",
  nostalgic: "from-purple-200 via-pink-200 to-indigo-200",
  hopeful: "from-amber-200 via-orange-200 to-yellow-200",
  default: "from-indigo-100 via-purple-100 to-rose-100"
};

export default function BackgroundMorph({ emotion = "default" }: { emotion?: string }) {
  const gradientClass = EMOTION_GRADIENTS[emotion as keyof typeof EMOTION_GRADIENTS] || EMOTION_GRADIENTS.default;

  return (
    <div className="absolute inset-0 z-0">
      <motion.div
        key={emotion}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}
      />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          key={`${emotion}-1`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "circOut" }}
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${gradientClass} rounded-full blur-3xl opacity-30 breathing-animation`}
          style={{ animationDuration: "10s" }}
        />
        <motion.div 
          key={`${emotion}-2`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
          className={`absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-l ${gradientClass} rounded-full blur-3xl opacity-20 breathing-animation`}
          style={{ animationDuration: "12s", animationDelay: "2s" }}
        />
      </div>
    </div>
  );
}
