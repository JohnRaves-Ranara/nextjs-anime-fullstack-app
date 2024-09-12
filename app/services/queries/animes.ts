import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  AnilistAnimeStatus,
  EpisodeChunk,
  EpisodeToBeRendered,
  Format,
  Season,
  SortBy,
  Episode,
} from "@/utils/types/animeAnilist";
import { Data } from "@/utils/types/animeAnify";
import {
  chunkEpisodes,
  getEpisodesToBeRendered,
} from "@/utils/functions/reusableFunctions";
import {
  fetchAllTimeFavoriteAnimes,
  fetchAnimeEpisodes,
  fetchAnimeInfoAnify,
  fetchAnimeInfoAnilist,
  fetchEpisodeStreamLinks,
  fetchPopularAnimes,
  fetchTopRatedAnimes,
  fetchTrendingAnimes,
  filterAnime,
  searchAnime,
} from "../functions/animes";
import { AnimeInfoAnizip } from "@/utils/types/animeAnizip";

const BASE_URL_ANILIST = "https://consumet-api-raves.vercel.app/meta/anilist";
const BASE_URL_ANIFY = "https://anify.eltik.cc/info";

// const frequentlyChanging = {
//   gcTime: 180 * (60 * 1000), //3 hrs
//   staleTime: 120 * (60 * 1000), //2 hrs
// };

// const rarelyChanging = {
//   gcTime: 300 * (60 * 1000), //5 hrs
//   staleTime: 240 * (60 * 1000), //4 hrs
// };

export function useFetchTrendingAnimes(perPage: number, pageNum: number) {
  return useSuspenseQuery({
    queryKey: ["trending", perPage, pageNum],
    queryFn: async () => {
      return fetchTrendingAnimes(perPage, pageNum);
    },
  });
}

export function useFetchTopRatedAnimes(perPage: number) {
  return useSuspenseQuery({
    queryKey: ["topRated", perPage],
    queryFn: async () => {
      return await fetchTopRatedAnimes(perPage);
    },
  });
}

export function useFetchAllTimeFavoriteAnimes(perPage: number) {
  return useSuspenseQuery({
    queryKey: ["allTimeFavorite", perPage],
    queryFn: async () => {
      return await fetchAllTimeFavoriteAnimes(perPage);
    },
  });
}

export function useSearchAnime(query: string, enabled: boolean) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      return await searchAnime(query);
    },
    enabled: enabled,
  });
}

export function useFilterAnime(
  query?: string,
  season?: Season,
  genres?: string,
  year?: number,
  sortBy?: SortBy,
  format?: Format,
  page?: number,
  status?: AnilistAnimeStatus
) {
  return useQuery({
    queryKey: [
      "filterAnime",
      query,
      season,
      genres,
      year,
      sortBy ?? SortBy.TRENDING_DESC,
      format,
      page ?? 1,
      status,
    ],
    queryFn: async () => {
      return await filterAnime(
        query,
        season,
        genres,
        year,
        sortBy,
        format,
        page,
        status
      );
    },
  });
}

export function useFetchAnimeInfoAnilist(animeId: string) {
  return useQuery({
    queryKey: ["animeInfoAnilist", animeId],
    queryFn: async () => {
      return await fetchAnimeInfoAnilist(animeId);
    },
  });
}

export function useFetchAnimeEpisodes(animeId: string) {
  return useQuery({
    queryKey: ["episodes", animeId],
    queryFn: async () => {
      return await fetchAnimeEpisodes(animeId);
    },
  });
}

export function useFetchPopularAnimes(perPage: number) {
  return useSuspenseQuery({
    queryKey: ["popular", perPage],
    queryFn: async () => {
      return await fetchPopularAnimes(perPage);
    },
  });
}

export function useFetchEpisodeStreamLinks(episodeId: string | null) {
  return useSuspenseQuery({
    queryKey: ["watchEpisode", episodeId],
    queryFn: async () => {
      return await fetchEpisodeStreamLinks(episodeId!);
    },
  });
}

export function useChunkEpisodes(
  animeEpisodes:
    | {
        anifyEps: Data[] | null;
        anilistEps: Episode[] | null;
        anizipEps: AnimeInfoAnizip | null;
      }
    | undefined
) {
  const anifyEpisodes = animeEpisodes?.anifyEps;
  const anilistEpisodes = animeEpisodes?.anilistEps;
  const anizipEpisodes = animeEpisodes?.anizipEps;
  return useQuery({
    queryKey: ["chunkedEpisodes", animeEpisodes],
    queryFn: () => {
      return chunkEpisodes(
        getEpisodesToBeRendered(anifyEpisodes, anilistEpisodes, anizipEpisodes),
        30
      );
    },
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
  });
}
