import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { InterestPropsTypes } from "../lib/definitions";
import { BASE_URL } from "../lib/utils";

export const Interest = (props: InterestPropsTypes) => {
  const { interest, checked, value } = props;
  const [isInterestChecked, setIsInterestChecked]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(checked);

  const updateInterestHandler = async (
    categoryId: number,
    interest: boolean
  ) => {
    const res = await axios.put(`${BASE_URL}/api/update-interest`, {
      categoryId: Number(categoryId),
      interest,
    });
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
