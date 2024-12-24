import React from "react";
import StatsPage from "../pages/stats";
import { auth } from "@/auth";

const page = async () => {

  const session = await auth();
  const userId = session?.user.id;

  return <StatsPage userId={userId as string} />;
};

export default page;
