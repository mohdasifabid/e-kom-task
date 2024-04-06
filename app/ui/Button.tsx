export const Button = ({ btnName, onClick, isDisabled }: any) => {
  return (
    <button
      onClick={onClick}
      className={`w-456 h-56 bg-black text-white rounded-md ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={isDisabled}
    >
      {btnName}
    </button>
  );
};
