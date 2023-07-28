"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UserInactivityProps {
  children: React.ReactNode;
}

const UserInactivity: React.FC<UserInactivityProps> = ({ children }) => {
  const session = useSession();
  const [idleTime, setIdleTime] = useState(0);

  useEffect(() => {
    if (session) {
      const timer = setInterval(() => {
        setIdleTime((idleTime) => idleTime + 1);
      }, 1000); // increment idle time every second

      return () => clearInterval(timer);
    }
  }, [session]);

  useEffect(() => {
    if (idleTime >= 600) {
      signOut();
    }
  }, [idleTime]);

  const handleActivity = () => {
    setIdleTime(0);
  };
  return (
    <div onMouseMove={handleActivity} onKeyUp={handleActivity}>
      {children}
    </div>
  );
};

export default UserInactivity;
