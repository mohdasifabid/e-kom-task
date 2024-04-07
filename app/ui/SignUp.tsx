"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Input } from "./Input";
import { Button } from "./Button";
import {
  createAccountHandler,
  generateOTP,
  handleNavigationToSignInPage,
  validateEmail,
  validateName,
  validatePassword,
} from "../lib/utils";

import { useData } from "../context";
import { useAuth } from "../lib/useAuth";

export const SignUp = (props: any) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, setData } = useData();
  useAuth("/register");
  const otp = generateOTP();

  const mutation: any = useMutation({
    mutationKey: ["signUp"],
    mutationFn: () => createAccountHandler(name, email, password),
    onSuccess: (data) => {
      setData({ ...store, userInfo: data?.newUser });
      router.push("/email-verification");
    },
  });

  useEffect(() => {
    if (mutation.data?.token || mutation.data?.error) {
      setData({
        ...store,
        userInfo: mutation.data?.currentUser || {},
        loginRes: mutation?.data || {},
        isAuthenticated: !!mutation.data?.token || false,
        successMsg: mutation.data?.success || "",
        errorMsg: mutation.data?.error || "",
      });
    }
  }, [mutation.data?.token, mutation.data?.error]);

  return (
    <div
      className="flex flex-col items-center border-2 border-gray-400 rounded-xl pl-12 pr-12 pb-4 w-576 h-614"
    >
      <p className="text-4xl pb-6 pt-16 font-inter text-32 font-semibold leading-38.73 text-left">
        Create your account
      </p>
      <div className="flex flex-col gap-10">
        <Input
          placeholder="Please enter name"
          label="Name"
          type="text"
          setter={setName}
          validate={validateName}
        />

        <Input
          placeholder="Please enter email"
          label="Email"
          type="email"
          setter={setEmail}
          validate={validateEmail}
        />
        <Input
          placeholder="Please enter password"
          label="Password"
          type="password"
          setter={setPassword}
          validate={validatePassword}
        />
        <span className="pt-2">
          <Button
            onClick={mutation.mutate}
            btnName="CREATE ACCOUNT"
            isDisabled={!(name && password && email)}
          />
        </span>
        <hr />
        <p className="flex justify-center pb-3 gap-3">
          Have an Account?{" "}
          <a
            className="cursor-pointer"
            onClick={() => handleNavigationToSignInPage(router)}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
