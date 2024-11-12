"use client";
import React from "react";
import { Button } from "./ui/button";
import { BarChart3, Home, LayoutGrid, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BottomNavigasi = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-2">
      <div className="flex justify-between items-center">
        <Button onClick={() => router.push("/home")} variant="ghost" size="icon" className={pathname === "/home" ? "text-purple-500" : "text-gray-400"}>
          <Home className="h-6 w-6" />
        </Button>
        <Button onClick={() => router.push("/category")} variant="ghost" size="icon" className={pathname === "/category" ? "text-purple-500" : "text-gray-400"}>
          <LayoutGrid className="h-6 w-6" />
        </Button>
        <Button onClick={() => router.push("/stats")} variant="ghost" size="icon" className={pathname === "/stats" ? "text-purple-500" : "text-gray-400"}>
          <BarChart3 className="h-6 w-6" />
        </Button>
        <Button onClick={() => router.push("/profile")} variant="ghost" size="icon" className={pathname === "/profile" ? "text-purple-500" : "text-gray-400"}>
          <User className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigasi;
