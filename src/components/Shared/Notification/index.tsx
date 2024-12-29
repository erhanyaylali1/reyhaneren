import React from "react";
import styles from "./notification.module.scss";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.notificationContent}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
