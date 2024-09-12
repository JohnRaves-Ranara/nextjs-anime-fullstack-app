import {
  fetchAnimeInfoAnilist,
} from "@/app/services/functions/animes";
import {
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import AnimeInfoPage from "./AnimeInfoPage";
import { getQueryClient } from "@/app/getQueryClient";

export default async function Home({
  params,
}: {
  params: {
    animeId: string;
  };
}) {
  const queryClient = getQueryClient()

  queryClient.prefetchQuery({
    queryKey: ["animeInfoAnilist", params.animeId],
    queryFn: () => fetchAnimeInfoAnilist(params.animeId)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimeInfoPage animeId={params.animeId} />
    </HydrationBoundary>
  );
}
