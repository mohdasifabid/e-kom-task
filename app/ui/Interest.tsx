import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { InterestPropsTypes } from "../lib/definitions";
import { BASE_URL } from "../lib/utils";
import { useData } from "../context";

export const Interest = (props: InterestPropsTypes) => {
  const { interest, checked, value, setIsUpdatePending } = props;
  const [isInterestChecked, setIsInterestChecked]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(checked);
const {store, setData} = useData()
  const updateInterestHandler = async (
    categoryId: number,
    interest: boolean
  ) => {
    setIsUpdatePending(true)
    const res = await axios.patch(`${BASE_URL}/api/get-categories`, {
      id: Number(categoryId),
      interested: interest,
    });
    if(res.status === 200){
      setIsUpdatePending(false)
    }
    return res;
  };
  const mutation = useMutation({
    mutationKey: ["categories"],
    mutationFn: ({
      categoryId,
      interest,
    }: {
      categoryId: number;
      interest: boolean;
    }) => updateInterestHandler(categoryId, interest),
    onSuccess:(data)=>{
      setData({
        toastStore: {
          state: true,
          message: data?.data?.message,
          type: data?.data?.type,
        },
      });
    },
    onError:(error)=>{
      setData({
        toastStore: {
          state: true,
          message: error?.message,
          type: error?.type,
        },
      });
    }
  });

  return (
    <div className="flex gap-5 items-center">
      <input
        type="checkbox"
        className="w-6 h-6"
        checked={isInterestChecked}
        value={value}
        onChange={(e) => {
          const catId = Number(e.target.value);
          setIsInterestChecked((prevState) => !prevState);
          mutation.mutate({ categoryId: catId, interest: !isInterestChecked });
        }}
      />
      <p>{interest}</p>
    </div>
  );
};
