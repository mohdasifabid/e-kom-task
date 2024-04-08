"use client";

import { Button } from "./Button";
import { BASE_URL, maskEmail } from "../lib/utils";
import { useEffect, useState } from "react";
import OtpInput from "./OtpInput";
import { useData } from "../context";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLocalStorage from "../lib/useLocalStorage";
import { useAuth } from "../lib/useAuth";
import { useMutation } from "@tanstack/react-query";

export const EmailVerification = (props: any) => {
  const [maskedEmail, setMaskedEmail] = useState("");
  const [otpValues, setOtpValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const router = useRouter();
  const [userInfo, setUserInfo] = useLocalStorage("userInfo");
  const otpString = otpValues?.join("");
  useEffect(() => {
    maskEmail(userInfo?.email, setMaskedEmail);
  }, []);
  const handleVerification = async () => {
    const endPoint = `${BASE_URL}/api/verify`;
    const res = await axios.post(endPoint, {
      id: userInfo?.id,
      otp: otpString,
    });

    if (res.status === 200) {
      const updatedUserInfo = { ...userInfo, isVerified: res.data.isVerified };
      setUserInfo(updatedUserInfo);

      router.push("/categories");
    }
  };
  const { mutate, isPending } = useMutation({
    mutationKey: ["emailVerification"],
    mutationFn: handleVerification,
  });
  return (
    <div className="flex flex-col items-center border-2 border-gray-400 rounded-xl pl-12 pr-12 pb-4 w-576 h-576">
      <p className="font-inter text-3xl pt-16 font-semibold leading-38.73 text-left">
        Verify your Email
      </p>
      <div className="font-inter text-base font-normal leading-4.84 text-center pt-6">
        <p>This is a div styled with Inter font.</p>
        <p className="font-inter text-base leading-4.84 text-center font-semibold">
          {maskedEmail}
        </p>
      </div>
      <div className="pt-10">
        <p>Code</p>
        <OtpInput otpValues={otpValues} setOtpValues={setOtpValues} />
      </div>
      <div className="pt-16">
        <Button
          btnName={isPending ? "Verifying email..." : "Verify"}
          isDisabled={otpString?.length < 7 || isPending}
          onClick={mutate}
        />
      </div>
    </div>
  );
};
