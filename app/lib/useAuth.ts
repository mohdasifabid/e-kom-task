"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export const useAuth = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useLocalStorage("userInfo")

    useEffect(() => {
        if (userInfo?.token) {
            if (userInfo?.isVerified) {
                return router.push("/categories");
            } else {
                return router.push("/email-verification")
            }
        } else {
            return router.push("/login")
        }
       
    }, [router, userInfo?.isVerified, userInfo?.token]);
}