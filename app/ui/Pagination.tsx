"use client";

import { FcPrevious, FcNext } from "react-icons/fc";
import { PaginationPropsType } from "../lib/definitions";

import { useData } from "../context";

export const Pagination = (props: PaginationPropsType) => {
  const { totalPages } = props;
  const { store, setData } = useData();
  const { currentPage } = store;

  let startPage = Math.max(1, currentPage - 3);
  let endPage = Math.min(totalPages, currentPage + 3);

  if (currentPage <= 3) {
    endPage = Math.min(7, totalPages);
  }
  const btnsList = [];

  for (let i = startPage; i <= endPage; i++) {
    btnsList.push(
      <button
        key={i}
        className={` ${i == currentPage ? `text-black` : `text-gray-400`}`}
        onClick={() => {
          setData({ currentPage: i });
        }}
      >
        {i}
      </button>
    );
  }
  const isPreviousIconDisabled = currentPage == 1;
  const isNextIconDisabled = currentPage == totalPages - 1;

  return (
    <div className="flex gap-3 items-center">
      <button
        className={`${isPreviousIconDisabled && "cursor-not-allowed"}`}
        disabled={isPreviousIconDisabled}
        onClick={() => setData({  currentPage: currentPage - 1 })}
      >
        <FcPrevious />
      </button>
      {btnsList}
      <button
        className={`${isNextIconDisabled && "cursor-not-allowed"}`}
        disabled={isNextIconDisabled}
        onClick={() => setData({  currentPage: currentPage + 1 })}
      >
        <FcNext />
      </button>
    </div>
  );
};
