import React from "react";
import CategoryPage from "../pages/category";
import { auth } from "@/auth";

const page = async () => {

  const session = await auth();
  const userId = session?.user?.id;

  return <CategoryPage userId={userId as string} />;
};

export default page;
