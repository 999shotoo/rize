"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AudioLines } from "lucide-react";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function CustomImage({
  src,
  alt,
  width,
  height,
  className = "",
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-card animate-pulse flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AudioLines className="h-12 w-12 text-primary-foreground" />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setIsLoading(false)}
          className={`${className}`}
        />
      </motion.div>
    </div>
  );
}
