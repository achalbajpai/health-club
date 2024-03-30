import { Service } from "@/services/services";
import { ResponseStatus, User } from "@/utils/constants";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<User>();
  useEffect(() => {
    Service.verify().then((response) => {
      if (response.status === ResponseStatus.Ok) {
        setUserData(response.res?.userDetails);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);
  return { isAuth, userData };
}
