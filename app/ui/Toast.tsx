import { useEffect, useState } from "react";
import ErrorAlert from "../alerts/errorAlert";
import SuccessAlert from "../alerts/successAlert";
import { useData } from "../context";

export const Toast = ({ type, message }) => {
  const [showToast, setShowToast] = useState(true);
  const { store, setData } = useData();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false);
      setData({
        toastStore: {
          state: false,
          message: "",
          type: "",
        },
      });
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);
  if (showToast) {
    if (type === "success") {
      return <SuccessAlert message={message} />;
    }

    return <ErrorAlert message={message} />;
  }
  return null;
};
