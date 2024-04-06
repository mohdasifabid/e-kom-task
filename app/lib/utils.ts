"use client"
import axios from "axios";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
    }
};

export const validatePassword = (value: string) => {
    if (value.length < 5) {
        return "Password must be at least 5 characters long";
    }
};

export const validateName = (value: string) => {
    if (value.length < 5) {
        return "Name must be at least 5 characters long";
    }
};

export const loginHandler = async (email: string | "", password: string | "", callback: any) => {
    const endPoint = `${BASE_URL}/api/login`;
    try {
        const res = await axios.post(endPoint, {
            email,
            password,
        });

        if (res.status === 200 || 201) {
            callback(res.data.token)
        }
        return res.data
    } catch (error: any) {
        return error?.response.data
    }
};

export const handleCategoryClick = (isAuthenticated: boolean, router: any) => {
    if (isAuthenticated) {
        router.push("/categories");
    } else {
        router.push("/login");
    }
};

export const handleNavigationToSignInPage = (router: any) => router.push("/login");


export const createAccountHandler = async (name: string | "", email: string | "", password: string | "", callback: any) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/create-account`, {
            name,
            email,
            password,
        });
        if (res.status === 201) {
            callback(res.data.token)
            return res.data
        }
    } catch (error: any) {
        return error?.response.data
    }
};

export const maskEmail = (email: string, setMaskedEmail: React.Dispatch<React.SetStateAction<string>>) => {
    const atIndex = email.indexOf('@');

    if (atIndex !== -1) {
        const username = email.substring(0, atIndex);
        const maskedUsername = username.substring(0, Math.max(0, username.length - 3)) + '***';
        const maskedEmailAddress = maskedUsername + email.substring(atIndex);
        setMaskedEmail(maskedEmailAddress);
    } else {
        console.error('Invalid email address:', email);
    }
};
