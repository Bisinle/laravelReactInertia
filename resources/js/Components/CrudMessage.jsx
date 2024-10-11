import React, { useEffect, useState } from "react";

const CrudMessage = ({
  success,
  className = "",
  children,
  duration = 3000,
  ...props
}) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timer;
    if (success) {
      setShowMessage(true);
      timer = setTimeout(() => {
        setShowMessage(false);
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [success, duration]);

  if (!showMessage) return null;

  return (
    <div
      {...props}
      className={`bg-emerald-500 py-2 px-4 text-white rounded mb-4 ${className}`}
    >
      {children || "Operation successful"}
    </div>
  );
};

export default CrudMessage;