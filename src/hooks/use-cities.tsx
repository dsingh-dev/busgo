import { useQuery } from "@tanstack/react-query";

export function useCities() {
    return useQuery({
      queryKey: ["cities"],
      queryFn: async () => {
        const res = await fetch("/api/cities");
        const data = await res.json();
        return data;
      },
      staleTime: Infinity,
    });
  }