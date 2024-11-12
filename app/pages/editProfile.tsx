'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function EditProfilePage() {
  const router = useRouter()
  const [name, setName] = useState('John Doe')
  const [imagePreview, setImagePreview] = useState('/placeholder-avatar.jpg')
  const [isUploading, setIsUploading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setIsUploading(true)
      // Create URL for preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your API call here to save the profile changes
    // For example:
    // await updateProfile({ name, profileImage: imagePreview })
    router.push('/profile')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 pb-32">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-white font-semibold">Edit Profile</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-white shadow-lg rounded-xl">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={imagePreview} alt="Profile" />
                      <AvatarFallback>
                        {name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                      <Label 
                        htmlFor="picture" 
                        className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full shadow-lg"
                      >
                        <Upload className="h-4 w-4" />
                      </Label>
                      <Input 
                        id="picture" 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {isUploading ? 'Uploading...' : 'Tap to change profile picture'}
                  </p>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-purple-500 hover:bg-purple-600"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}