import { useQuery } from "@tanstack/react-query";
import { ErrorResponse } from "../types/error.type";
import { clearAuthSession, getAuthSession } from "../utils/storage";

export default function useAuthRedirect({ navigation }) {
  const {refetch } = useQuery({
    queryKey: ["session"],
    queryFn: getAuthSession,
    //onsuccess: stay on page
    onSuccess: (data) => {
      if (data) {
        navigation.navigate("FeedPage");
      }
    },
    //onerror: redirect to login
    onError: (error: ErrorResponse) => {
      if (error.cause?.code === 401) {
        clearAuthSession();
        navigation.navigate("LoginPage");
      } else {
        // If an unknown error occurs,
        // try to refetch every second until we can verify that either the user is authenticated or not
        setTimeout(() => {
          void refetch();
        }, 1000);
      }
    },
    retry: false,
  });
}
