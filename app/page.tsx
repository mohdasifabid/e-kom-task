"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useData } from "./context";
import useLocalStorage from "./lib/useLocalStorage";

export default function Home() {
  const { store, setData } = useData();
  const [userInfo, setUserInfo] = useLocalStorage("userInfo")

  const router = useRouter();
  

  return <main className="flex min-h-screen min-w-screen bg-white"></main>;
}
