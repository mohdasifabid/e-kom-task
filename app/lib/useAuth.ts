"use client"

import { useRouter } from "next/navigation";
import { useData } from "../context";
import { useEffect } from "react";

export const useAuth = (path) => {
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
            router.push(path);
        }
    }, [store.isAuthenticated]);
}