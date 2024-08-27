import {
  fetchAnimeInfo,
  fetchAnimeInfoAnify,
  fetchAnimeInfoAnilist,
  fetchEpisodeStreamLinks,
} from "@/app/services/functions/animes";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import AnimeWatchPage from "./AnimeWatchPage";

export default async function Home({
  searchParams,
  params,
}: {
  searchParams: {
    id: string;
  };
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
    queryKey: ["watchEpisode", searchParams.id],
    queryFn: () => fetchEpisodeStreamLinks(searchParams.id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["animeInfo", params.animeId],
    queryFn: () => fetchAnimeInfo(params.animeId)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimeWatchPage animeId={params.animeId}/>
    </HydrationBoundary>
  );
}
