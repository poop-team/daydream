import { useQuery } from "@tanstack/react-query";
import { ErrorResponse } from "../types/error.type";
import { clearAuthSession, getAuthSession } from "../utils/storage";

export default function useAuthRedirect({ navigation }) {
    useQuery({
    queryKey: ["session"],
    queryFn: getAuthSession,
    //onsuccess: stay on page
    onError: (err: ErrorResponse) => {
      clearAuthSession().then(() => {
        //This might not have to happen here if we check for auth in the root navigator
        navigation.navigate("Home");
      });
    },
  });
}
