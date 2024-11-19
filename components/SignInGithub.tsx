"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
export default function SignInGithub() {
  const handleClick = async () => {
    await signIn("github", {
      callbackUrl: "/home",
    });
  };
  return (
    <Button variant="outline" className="w-full" onClick={handleClick}>
      <Image
        alt="github logo"
        src="/github-mark.png"
        width={19}
        height={19}
        className="mr-2"
      />
      Continue with Github
    </Button>
  );
}