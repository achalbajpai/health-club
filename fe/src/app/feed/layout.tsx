"use client";
import SideBar from "@/components/sidebar";
import { useAuth } from "@/hooks/useAuth";
import Loader from "../loader";
import { redirect } from "next/navigation";
import { createContext } from "react";
import { User } from "@/utils/constants";
const UserContext = createContext<User | undefined>(undefined);
export default function FeedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isAuth, userData } = useAuth();
  if (isAuth === null) {
    return <Loader />;
  }
  if (!isAuth) {
    redirect("/home");
  }
  return (
    <section className="max-w-[1309px] mx-auto flex">
      <UserContext.Provider value={userData}>
        <SideBar />
        {children}
      </UserContext.Provider>
    </section>
  );
}
export { UserContext };
