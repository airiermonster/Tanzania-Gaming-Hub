"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export function ImageGallery({
  images,
  onImagesChange,
}: {
  images: string[];
  onImagesChange: (images: string[]) => void;
}) {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // TODO: Implement actual image upload to Supabase storage
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      onImagesChange([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <Card key={index} className="relative group">
            <div className="aspect-square relative">
              <Image
                src={url}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
        <Card className="aspect-square flex items-center justify-center">
          <Button
            variant="ghost"
            className="w-full h-full"
            onClick={() => document.getElementById("gallery-upload")?.click()}
          >
            <Upload className="h-6 w-6" />
          </Button>
          <input
            id="gallery-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </Card>
      </div>
    </div>
  );
}