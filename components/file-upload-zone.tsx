"use client"

import React, { useState, useCallback } from "react";
import { Upload, FileAudio } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void;
}

export default function FileUploadZone({ onFileUpload }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const audioFile = files.find(file => file.type.startsWith("audio/"));
    
    if (audioFile) {
      onFileUpload(audioFile);
    }
  }, [onFileUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      onFileUpload(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 transition-all duration-300 cursor-pointer ${
        dragActive 
          ? "border-primary bg-indigo-100/50" 
          : "border-border hover:border-primary hover:bg-indigo-50/50"
      }`}
      onClick={handleBrowseClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-white/50 rounded-2xl flex items-center justify-center shadow-inner">
          <FileAudio className="w-10 h-10 text-primary" />
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          Drop your song here
        </h3>
        
        <p className="text-gray-500 mb-6 text-lg">
          {dragActive 
            ? "Release to start the magic!" 
            : "Drag & drop an MP3 file"
          }
        </p>
        
        <p className="text-gray-500 mb-6">or</p>
        
        <Button className="bg-gradient-to-r from-primary to-highlight text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
          <Upload className="w-5 h-5 mr-2" />
          Choose File
        </Button>
      </div>
    </div>
  );
}
