import Arrow from "./Arrow";

export default function OfferBar() {
  return (
    <div className="h-9 flex gap-3 justify-center items-center bg-gray-200 mt-100">
      <Arrow dir="left" />
      <p className="text-sm font-medium leading-5 text-left">
        Get 10% of on bussiness sign up
      </p>
      <Arrow dir="right" />
    </div>
  );
}