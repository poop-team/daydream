import { useEffect, useState } from "react";

// Explanation as to why this exists:
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
export default function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
