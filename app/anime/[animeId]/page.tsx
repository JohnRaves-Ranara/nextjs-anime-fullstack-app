import {
  fetchAnimeInfo,
  fetchAnimeInfoAnify,
  fetchAnimeInfoAnilist,
} from "@/app/services/functions/animes";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import AnimeInfoPage from "./AnimeInfoPage";

export default async function Home({
  params,
}: {
  params: {
    animeId: string;
  };
}) {
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
    queryKey: ["animeInfo", params.animeId],
    queryFn: () => fetchAnimeInfo(params.animeId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimeInfoPage animeId={params.animeId} />
    </HydrationBoundary>
  );
}
