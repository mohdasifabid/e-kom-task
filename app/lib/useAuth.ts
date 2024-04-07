"use client"

import { useRouter } from "next/navigation";
import { useData } from "../context";
import { useEffect } from "react";

export const useAuth = (path?: string) => {
    const { store } = useData()
    const router = useRouter();
    useEffect(() => {
        if (store.isAuthenticated && store?.userInfo?.isVerified) {
            router.push("/categories");

        } else if (
            store.isAuthenticated && !store?.userInfo?.isVerified
        ) {
            router.push("/email-verification");
        } else {
            if (path) {
                ``
                router.push(path);

            } else {
                router.push("/login");

            }
        }
    }, [store.isAuthenticated, path, router, store?.userInfo?.isVerified]);
}