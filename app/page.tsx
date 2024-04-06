"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useData } from "./context";

export default function Home() {
  const { store, setData } = useData()
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken")
    if (store.isAuthenticated) {
      router.push("/categories");
    } else if (!!token) {
      setData({ ...store, isAuthenticated: !!token })
      router.push("/categories");
    } else {
      router.push("/login");
    }
  }, [store.isAuthenticated]);

  return (
    <main className="flex min-h-screen min-w-screen bg-white">
    </main>
  );
}
