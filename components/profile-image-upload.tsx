"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileImageUploadProps {
  initialImage?: string
}

export default function ProfileImageUpload({ initialImage }: ProfileImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result)

        // In a real app, you would upload the image to a server here
        // and save the URL to a database
        console.log("Image uploaded:", file.name)
      }
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-emerald-600 dark:border-emerald-400 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
      {image ? (
        <>
          <img src={image || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" className="rounded-full" onClick={triggerFileInput}>
                <Upload className="h-4 w-4 mr-1" /> Change
              </Button>
              <Button variant="destructive" size="sm" className="rounded-full" onClick={removeImage}>
                <X className="h-4 w-4 mr-1" /> Remove
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-4">
          <Upload className="h-12 w-12 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">Upload your profile picture</p>
          <Button
            variant="outline"
            onClick={triggerFileInput}
            className="border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900"
          >
            Select Image
          </Button>
        </div>
      )}
      <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
    </div>
  )
}

