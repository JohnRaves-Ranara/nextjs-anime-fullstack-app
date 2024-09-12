import {
  fetchAnimeEpisodes,
  fetchAnimeInfoAnilist,
  fetchEpisodeStreamLinks,
} from "@/app/services/functions/animes";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import AnimeWatchPage from "./AnimeWatchPage";
import { getQueryClient } from "@/app/getQueryClient";

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
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["watchEpisode", searchParams.id],
    queryFn: () => fetchEpisodeStreamLinks(searchParams.id),
  });

  queryClient.prefetchQuery({
    queryKey: ["animeInfoAnilist", params.animeId],
    queryFn: () => fetchAnimeInfoAnilist(params.animeId),
  });

  queryClient.prefetchQuery({
    queryKey: ["episodes", params.animeId],
    queryFn: () => fetchAnimeEpisodes(params.animeId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimeWatchPage animeId={params.animeId} episodeId={searchParams.id} />
    </HydrationBoundary>
  );
}
