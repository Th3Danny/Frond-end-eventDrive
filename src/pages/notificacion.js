import React, { useState, useEffect } from "react";

function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const notify = (message) => {
    setNotifications([...notifications, message]);
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(notifications.slice(1));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return { notifications, notify };
}

export default useNotifications;
