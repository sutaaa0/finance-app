"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, LayoutGrid, BarChart3, User, Menu, Settings, HelpCircle, LogOut, CreditCard, Bell } from "lucide-react";
import MenuButton from "@/components/MenuButton";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const menuItems = [
    { icon: CreditCard, label: "Payment Methods", onClick: () => router.push("/payment") },
    { icon: Bell, label: "Notifications", onClick: () => router.push("/notification") },
    { icon: Settings, label: "Settings", onClick: () => router.push("/settings") },
    { icon: HelpCircle, label: "Help & Support", onClick: () => router.push("/help") },
    { icon: LogOut, label: "Log Out", onClick: () => handleLogout() },
  ];
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      const response = await signOut({ callbackUrl: "/signin" });
      if (response) {
        toast.success("Logged out successfully!");
        router.push("/signin");
      }
    } catch (error) {
      return toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 pb-32">
        <div className="flex justify-between items-center">
          <MenuButton />
          <h1 className="text-white font-semibold">Profile</h1>
          <div className="w-6" /> {/* Placeholder for symmetry */}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-24 relative z-10">
        <Card className="p-6 bg-white shadow-lg rounded-xl">
          <CardContent className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={session?.user?.image ?? "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg?w=826"} alt="User" />
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-1">{session?.user?.name}</h2>
            <p className="text-gray-500 mb-4">{session?.user?.email}</p>
            <Button className="mb-6" onClick={() => router.push("/profile/edit")}>
              Edit Profile
            </Button>

            <div className="w-full space-y-4">
              {menuItems.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Button variant="ghost" className="w-full justify-start text-left" onClick={item.onClick}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
