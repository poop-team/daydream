import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const createQueryWrapper = () => {
  const Wrapper = ({ children }: { children: JSX.Element }) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
  Wrapper.displayName = "Wrapper";
  return Wrapper;
};
