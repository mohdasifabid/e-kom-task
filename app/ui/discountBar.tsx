import { GrNext, GrPrevious } from "react-icons/gr";
export const DiscountBar = (props: any) => {
  return (
    <div className="flex gap-3 bg-gray-300 w-full justify-center pt-1 pb-1 h-36">
      <button>
        <GrPrevious />
      </button>
      <p> Get 10% off on business sign up</p>
      <button>
        <GrNext />
      </button>
    </div>
  );
};
