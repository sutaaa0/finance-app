import { BarChart3, Home, LayoutGrid, Menu, User } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
const MenuButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard" },
    { icon: LayoutGrid, label: "Categories" },
    { icon: BarChart3, label: "Statistics" },
    { icon: User, label: "Profile" },
  ];

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigate through your ExpenseWise app</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {menuItems.map((item, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuButton;
