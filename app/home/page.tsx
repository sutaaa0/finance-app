import React from "react";
import HomePage from "../pages/home";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  console.log("data session", session);

  if (!session) {
    redirect("/signin");
  }

  return <HomePage />;
};

export default page;
