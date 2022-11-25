import { getAuthSession } from "../utils/storage";
import { useQuery } from "@tanstack/react-query";

export default function useGetAuthStorage() {
    return useQuery({
        queryKey: ["session"],
        queryFn: getAuthSession,
    });
}
