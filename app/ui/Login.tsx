"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "./Button";
import { Input } from "./Input";
import { loginHandler, validateEmail, validatePassword } from "../lib/utils";
import useLocalStorage from "../lib/useLocalStorage";

export const Login = (props: any) => {
  const router = useRouter();
  const [email, setEmail]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");

  const [password, setPassword]: [
    string | number,
    React.Dispatch<React.SetStateAction<any>>
  ] = useState("");
  
  const [userInfo, setUserInfo] = useLocalStorage("userInfo")

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: () =>
      loginHandler(email, password, (data) => {
        setUserInfo(data)
        router.push("/categories");
        
      }),
  });
  const handleNavigationToSignUpPage = () => router.push("/register");
 
  return (
    <div className="flex flex-col items-center border-2 border-gray-400 rounded-xl pl-12 pr-12 pb-4 w-576 h-691">
      <p className="text-3xl font-600 mb-4 pt-16">Login</p>
      <p className="text-2xl font-500">Welcome back to ECOMMERCE</p>
      <p className="mb-4 font-400"> The next gen business marketplace</p>
      <div className="flex flex-col gap-10">
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
            btnName={mutation.isPending ? "Logging in..." : "Login"}
            onClick={mutation.mutate}
            isDisabled={!(email && password) || mutation.isPending}
          />
        </span>
        <hr />
        <p className="flex justify-center pb-3 gap-3">
          Dont have an Account?{" "}
          <a className="cursor-pointer" onClick={handleNavigationToSignUpPage}>
            SIGN UP
          </a>
        </p>
      </div>
    </div>
  );
};
