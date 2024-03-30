"use client";

import Features from "@/components/features";
import Welcome from "@/components/welcome";
import { useAuth } from "@/hooks/useAuth";
import Loader from "../loader";
import { redirect } from "next/navigation";

export default function Home() {
  const { isAuth } = useAuth();
  if (isAuth === null) {
    return <Loader />;
  }
  if (isAuth) {
    redirect("/feed");
  }
  return (
    <>
      <Welcome />
      <Features />
    </>
  );
}
