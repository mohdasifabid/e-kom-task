"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Input } from "./Input";
import { Button } from "./Button";
import {
  createAccountHandler,
  handleNavigationToSignInPage,
  validateEmail,
  validateName,
  validatePassword,
} from "../lib/utils";

import { useData } from "../context";
import useLocalStorage from "../lib/useLocalStorage";

export const SignUp = (props: any) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useLocalStorage("userInfo");

  const { store, setData } = useData();

  const {mutate,isPending}: any = useMutation({
    mutationKey: ["signUp"],
    mutationFn: () => createAccountHandler(name, email, password),
    onSuccess: (data) => {
      setUserInfo(data);
      setData({ ...store, userInfo: data });
      router.push("/email-verification");
    },
  });
  return (
    <div className="flex flex-col items-center border-2 border-gray-400 rounded-xl pl-12 pr-12 pb-4 w-576 h-614">
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
            onClick={mutate}
            btnName={
              isPending ? "Registering user..." : "CREATE ACCOUNT"
            }
            isDisabled={!(name && password && email) || isPending}
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
