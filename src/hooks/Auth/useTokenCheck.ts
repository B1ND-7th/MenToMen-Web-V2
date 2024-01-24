import { MenToMenToast } from "@/src/utils/Toast/menToMenToast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/src/constants/Auth/auth.constant";
import token from "@/src/libs/token/token";

const useTokenCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      if (
        !token.getCookie(ACCESS_TOKEN_KEY) ||
        !token.getCookie(REFRESH_TOKEN_KEY)
      ) {
        MenToMenToast.showInfo("로그인이 필요한 서비스입니다.");
        router.push("/");
      }
    };
    checkToken();
  }, [router]);
};

export default useTokenCheck;
