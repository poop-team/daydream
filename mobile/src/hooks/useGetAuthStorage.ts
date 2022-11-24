import { getAuthSession } from "../utils/storage";
import { useQuery } from "@tanstack/react-query";

export default function useAuthGetStorage() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getAuthSession,
  }).data;
}
