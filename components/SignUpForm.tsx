"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Add your signup logic here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/home" });
  };
  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/home" });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 items-center">
          <motion.div
            className="w-24 h-24 mb-4"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-pink-500">
              <path d="M15.45,5.95L14,7.4L12.55,5.95C11.65,5.05 10.35,5.05 9.45,5.95L7.45,7.95C6.55,8.85 6.55,10.15 7.45,11.05L8.9,12.5L7.45,13.95C6.55,14.85 6.55,16.15 7.45,17.05L9.45,19.05C10.35,19.95 11.65,19.95 12.55,19.05L14,17.6L15.45,19.05C16.35,19.95 17.65,19.95 18.55,19.05L20.55,17.05C21.45,16.15 21.45,14.85 20.55,13.95L19.1,12.5L20.55,11.05C21.45,10.15 21.45,8.85 20.55,7.95L18.55,5.95C17.65,5.05 16.35,5.05 15.45,5.95M12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5M12,10.5A1.5,1.5 0 0,0 10.5,12A1.5,1.5 0 0,0 12,13.5A1.5,1.5 0 0,0 13.5,12A1.5,1.5 0 0,0 12,10.5Z" />
            </svg>
          </motion.div>
          <CardTitle className="text-2xl font-bold text-center">Join PiggyWise</CardTitle>
          <CardDescription className="text-center">Start your journey to financial freedom</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Sign up with Google
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={handleGithubSignIn}>
              <Image src="/github-mark.png" alt="Github" width={20} height={20} className="mr-2 h-4 w-4" />
              Sign up with Github
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign up with email</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to the{" "}
                <a href="#" className="text-primary underline">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary underline">
                  privacy policy
                </a>
              </label>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <motion.div className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /> : "Create Account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/signin" className="text-primary underline">
              Log in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}