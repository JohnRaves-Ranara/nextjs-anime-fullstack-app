import {
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import AnimeHomePage from "./AnimeHomePage";
import {
  fetchPopularAnimes,
  fetchTopRatedAnimes,
  fetchTrendingAnimes,
} from "../services/functions/animes";
import { getQueryClient } from "../getQueryClient";

export default async function Home() {
  const queryClient = getQueryClient()

  queryClient.prefetchQuery({
    queryKey: ["trending", 17, 1],
    queryFn: () => fetchTrendingAnimes(17, 1),
  });

  queryClient.prefetchQuery({
    queryKey: ["popular", 12],
    queryFn: () => fetchPopularAnimes(12),
  });

  queryClient.prefetchQuery({
    queryKey: ["topRated", 12],
    queryFn: () => fetchTopRatedAnimes(12),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimeHomePage />
    </HydrationBoundary>
  );
}
