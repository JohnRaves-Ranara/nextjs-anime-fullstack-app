"use server"

import axios from "axios";
import {
  AnilistAnimeStatus,
  AnimeInfoAnilist,
  EpisodeStreamLinks,
  Format,
  MultipleAnimeResponse,
  Season,
  SortBy,
  Episode,
} from "@/utils/types/animeAnilist";
import { AnimeInfoAnify, Data } from "@/utils/types/animeAnify";
import { AnimeInfoAnizip } from "@/utils/types/animeAnizip";

const BASE_URL_ANILIST = "https://consumet-api-raves.vercel.app/meta/anilist";
const BASE_URL_ANIFY = "https://anify.eltik.cc/info";

export async function fetchTrendingAnimes(perPage: number, pageNum: number) {
  const { data: trendingAnimes } = await axios.get(
    `${BASE_URL_ANILIST}/advanced-search?sort=["TRENDING_DESC"]&perPage=${perPage}&page=${pageNum}`
  );
  console.log("FETCHED TRENDING");
  return trendingAnimes as MultipleAnimeResponse;
}

export async function fetchTopRatedAnimes(perPage: number) {
  const { data: cachedTopRated } = await axios.get(
    `${BASE_URL_ANILIST}/advanced-search?sort=["SCORE_DESC"]&perPage=${perPage}&page=1`
  );
  console.log("FETCHED TOP RATED");
  return cachedTopRated as MultipleAnimeResponse;
}

export async function fetchAllTimeFavoriteAnimes(perPage: number) {
  const { data: cachedAllTimeFavorite } = await axios.get(
    `${BASE_URL_ANILIST}/advanced-search?sort=["FAVOURITES_DESC"]&perPage=${perPage}&page=1`
  );
  console.log("FETCHED ALL TIME FAVE");
  return cachedAllTimeFavorite as MultipleAnimeResponse;
}

export async function searchAnime(query: string) {
  const { data: searchResults } = await axios.get(
    `${BASE_URL_ANILIST}/advanced-search?query=${query}&perPage=10`
  );
  return searchResults as MultipleAnimeResponse;
}

export async function filterAnime(
  query?: string,
  season?: Season,
  genres?: string,
  year?: number,
  sortBy?: SortBy,
  format?: Format,
  page?: number,
  status?: AnilistAnimeStatus
) {
  const _query = query ? `&query=${query}` : "";
  const _season = season ? `&season=${season}` : "";
  const _genres =
    genres && genres.length !== 0
      ? `&genres=[${genres
          .split(",")
          .map((genre) => `"${genre}"`)
          .join(",")}]`
      : "";
  const _year = year ? `&year=${year}` : "";
  const _sortBy = `&sort=["${sortBy ?? SortBy.TRENDING_DESC}"]`;
  const _format = format ? `&format=${format}` : "";
  const _page = `&page=${page ?? 1}`;
  const _status = status ? `&status=${status}` : "";

  const { data: filteredAnimes } = await axios.get(
    `${BASE_URL_ANILIST}/advanced-search?perPage=30${_query}${_season}${_genres}${_year}${_sortBy}${_format}${_page}${_status}`
  );

  console.log('SEARCH FOR ANIME', query);
  return filteredAnimes as MultipleAnimeResponse;
}

export async function fetchAnimeInfoAnilist(animeId: string) {
  const { data: animeInfoAnilist } = await axios.get(
    `${BASE_URL_ANILIST}/data/${animeId}`
  );
  console.log('FETCHED ANIME INFO ANILIST', animeId);
  return animeInfoAnilist as AnimeInfoAnilist;
}

export async function fetchAnimeInfoAnify(id: string) {
  const { data: cachedAnimeInfoAnify } = await axios.get(
    `${BASE_URL_ANIFY}/${id}?fields=[episodes,bannerImage,coverImage,title,rating,trailer,description,type,id,totalEpisodes,year,status,format]`
  );
  console.log("FETCHED ANILIST");
  return cachedAnimeInfoAnify as AnimeInfoAnify;
}

export async function fetchPopularAnimes(perPage: number) {
  const { data: popularAnimes } = await axios.get(
    `${BASE_URL_ANILIST}/advanced-search?sort=["POPULARITY_DESC"]&perPage=${perPage}`
  );
  console.log("FETCHED POPULAR");
  return popularAnimes as MultipleAnimeResponse;
}

export async function fetchAnimeEpisodes(animeId: string) {
  const [anifyEpsResponse, anilistEpsResponse, anizipEpsResponse] =
    await axios.all([
      axios
        .get(`https://anify.eltik.cc/info/${animeId}?fields=[episodes]`)
        .catch(() => null),
      axios.get(`${BASE_URL_ANILIST}/episodes/${animeId}`).catch(() => null),
      axios
        .get(`https://api.ani.zip/mappings?anilist_id=${animeId}`)
        .catch(() => null),
    ]);

  if (!anifyEpsResponse && !anilistEpsResponse) {
    throw new Error("there was an error fetching episodes for this anime");
  }
  const anifyEps = anifyEpsResponse?.data.episodes.data as Data[];
  const anilistEps = anilistEpsResponse?.data as Episode[];
  const anizipEps = anizipEpsResponse?.data as AnimeInfoAnizip;

  console.log('FETCHED EPISODES', animeId);

  return { anifyEps, anilistEps, anizipEps };
}

export async function fetchEpisodeStreamLinks(episodeId: string) {
  const { data: episodeStreamLinks } = await axios.get(
    `${BASE_URL_ANILIST}/watch/${episodeId}`
  );
  console.log("FETCHED EPISODE LINKS", episodeId);
  return episodeStreamLinks as EpisodeStreamLinks;
}
