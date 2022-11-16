import { useEffect, useState } from "react";

export default function useClient() {
  // Used to render client-side dependant data like the user's name stored in local storage
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
