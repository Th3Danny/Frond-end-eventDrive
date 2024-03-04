import React, { useState } from "react";

function useNotifications() {
  const [notification, setNotification] = useState(null);

  const notify = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 5000); 
  };

  return { notification, notify };
}

export default useNotifications;
