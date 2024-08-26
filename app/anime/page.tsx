import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import AnimeHomePage from "./AnimeHomePage";
import {
  fetchPopularAnimes,
  fetchTopRatedAnimes,
  fetchTrendingAnimes,
} from "../services/functions/animes";

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
        retry: false,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["trending", 17, 1],
    queryFn: () => fetchTrendingAnimes(17, 1),
  });

  await queryClient.prefetchQuery({
    queryKey: ["popular", 12],
    queryFn: () => fetchPopularAnimes(12),
  });

  await queryClient.prefetchQuery({
    queryKey: ["topRated", 12],
    queryFn: () => fetchTopRatedAnimes(12),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimeHomePage />
    </HydrationBoundary>
  );
}
