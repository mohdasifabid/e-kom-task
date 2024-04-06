"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useData } from "./context";

export default function Home() {
  const { store, setData } = useData();
  const userInfo = store?.userInfo;
  const router = useRouter();

  useEffect(() => {
    if (userInfo?.isVerified) {
      router.push("/categories");
    }
    router.push("/email-varification");
  }, [userInfo?.isVerified]);

  return <main className="flex min-h-screen min-w-screen bg-white"></main>;
}
