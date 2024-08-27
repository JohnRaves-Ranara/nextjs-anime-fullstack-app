import { useQuery } from "@tanstack/react-query";
import {
  AnimeInfoAnilist,
  EpisodeChunk,
  EpisodeToBeRendered,
} from "@/utils/types/animeAnilist";
import { AnimeInfoAnify } from "@/utils/types/animeAnify";
import {
  chunkEpisodes,
  getEpisodesToBeRendered,
} from "@/utils/functions/reusableFunctions";
import {
  fetchAllTimeFavoriteAnimes,
  fetchAnimeInfoAnify,
  fetchAnimeInfoAnilist,
  fetchEpisodeStreamLinks,
  fetchPopularAnimes,
  fetchTopRatedAnimes,
  fetchTrendingAnimes,
  searchAnime,
} from "../functions/animes";

const BASE_URL_ANILIST = "https://consumet-api-green.vercel.app/meta/anilist";
const BASE_URL_ANIFY = "https://anify.eltik.cc/info";

// const frequentlyChanging = {
//   gcTime: 180 * (60 * 1000), //3 hrs
//   staleTime: 120 * (60 * 1000), //2 hrs
// };

// const rarelyChanging = {
//   gcTime: 300 * (60 * 1000), //5 hrs
//   staleTime: 240 * (60 * 1000), //4 hrs
// };

//this is the settings during development. to minimize network requests
const neverRefetchSettings = {
  gcTime: Infinity,
  staleTime: Infinity,
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export function useFetchTrendingAnimes(perPage: number, pageNum: number) {
  return useQuery({
    queryKey: ["trending", perPage, pageNum],
    queryFn: async () => {
      return fetchTrendingAnimes(perPage, pageNum);
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchTopRatedAnimes(perPage: number) {
  return useQuery({
    queryKey: ["topRated", perPage],
    queryFn: async () => {
      return fetchTopRatedAnimes(perPage);
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchAllTimeFavoriteAnimes(perPage: number) {
  return useQuery({
    queryKey: ["allTimeFavorite", perPage],
    queryFn: async () => {
      return fetchAllTimeFavoriteAnimes(perPage);
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useSearchAnime(id: string) {
  return useQuery({
    queryKey: ["search", id],
    queryFn: async () => {
      return searchAnime(id);
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchAnimeInfo(id: string) {
  return useQuery({
    queryKey: ["animeInfo", id],
    queryFn: async () => {
      const animeInfoAnilist = await fetchAnimeInfoAnilist(id);
      const animeInfoAnify = await fetchAnimeInfoAnify(id);
      return { animeInfoAnilist, animeInfoAnify };
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchPopularAnimes(perPage: number) {
  return useQuery({
    queryKey: ["popular", perPage],
    queryFn: async () => {
      return fetchPopularAnimes(perPage);
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useFetchEpisodeStreamLinks(episodeId: string | null) {
  return useQuery({
    queryKey: ["watchEpisode", episodeId],
    queryFn: async () => {
      return fetchEpisodeStreamLinks(episodeId!);
    },
    enabled: !!episodeId,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useChunkEpisodes(
  animeInfo:
    | {
        animeInfoAnilist: AnimeInfoAnilist;
        animeInfoAnify: AnimeInfoAnify;
      }
    | undefined
) {
  return useQuery({
    queryKey: [
      "chunkedEpisodes",
      `anify ${animeInfo?.animeInfoAnify.id} anilist ${animeInfo?.animeInfoAnilist.id}`,
    ],
    queryFn: () => {
      console.log("ANIMEINFOANILIST", animeInfo!.animeInfoAnilist);
      console.log("USECHUNKEPISODES RAN");
      return chunkEpisodes(
        getEpisodesToBeRendered(
          animeInfo?.animeInfoAnify,
          animeInfo?.animeInfoAnilist
        ),
        30
      );
    },
    enabled: !!animeInfo,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}

export function useEpisodeInfo(
  episodeId: string | null,
  chunkedEpisodes: EpisodeChunk[] | null | undefined
) {
  return useQuery({
    queryKey: ["episodeInfo", episodeId],
    queryFn: () => {
      let foundEpisode: unknown;
      for (let i = 0; i < chunkedEpisodes!.length; i++) {
        foundEpisode = chunkedEpisodes![i].episodes.find(
          (episode) => episode.id.replace(/^\//, "") === episodeId
        );
        if (foundEpisode) break;
      }
      return foundEpisode as EpisodeToBeRendered;
    },
    enabled: !!chunkedEpisodes && !!episodeId,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    ...neverRefetchSettings,
  });
}
