import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const PrivateLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  return <>{children}</>;
};

export default PrivateLayout;
