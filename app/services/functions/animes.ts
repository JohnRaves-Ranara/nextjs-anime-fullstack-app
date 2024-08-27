import axios from "axios";
import {
  AnimeInfoAnilist,
  EpisodeChunk,
  EpisodeStreamLinks,
  EpisodeToBeRendered,
  MultipleAnimeResponse,
} from "@/utils/types/animeAnilist";
import { AnimeInfoAnify } from "@/utils/types/animeAnify";
import {
  chunkEpisodes,
  getEpisodesToBeRendered,
} from "@/utils/functions/reusableFunctions";

const BASE_URL_ANILIST = "https://consumet-api-green.vercel.app/meta/anilist";
const BASE_URL_ANIFY = "https://anify.eltik.cc/info";

export async function fetchTrendingAnimes(perPage: number, pageNum: number) {
  const { data: trendingAnimes } = await axios.get(
    `${BASE_URL_ANILIST}/advanced-search?sort=["TRENDING_DESC"]&perPage=${perPage}&page=${pageNum}`
  );
  return trendingAnimes as MultipleAnimeResponse;
}

export async function fetchTopRatedAnimes(perPage: number) {
  const { data: trendingAnimes } = await axios.get(
    `${BASE_URL_ANILIST}/advanced-search?sort=["SCORE_DESC"]&perPage=${perPage}&page=1`
  );
  return trendingAnimes as MultipleAnimeResponse;
}

export async function fetchAllTimeFavoriteAnimes(perPage: number) {
  const { data: trendingAnimes } = await axios.get(
    `${BASE_URL_ANILIST}/advanced-search?sort=["FAVOURITES_DESC"]&perPage=${perPage}&page=1`
  );
  return trendingAnimes as MultipleAnimeResponse;
}

export async function searchAnime(id: string) {
  const { data: searchResults } = await axios.get(`${BASE_URL_ANILIST}/${id}`);
  return searchResults;
}

export async function fetchAnimeInfoAnilist(id: string) {
  const { data: animeInfoAnilist } = await axios.get(
    `${BASE_URL_ANILIST}/info/${id}`
  );
  return animeInfoAnilist as AnimeInfoAnilist;
}

export async function fetchAnimeInfoAnify(id: string) {
  const { data: animeInfoAnify } = await axios.get(
    `${BASE_URL_ANIFY}/${id}?fields=[episodes,bannerImage,coverImage,title,rating,trailer,description,type,id,totalEpisodes,year,status,format]`
  );
  return animeInfoAnify as AnimeInfoAnify;
}

export async function fetchAnimeInfo(id: string) {
  const animeInfoAnilist = await fetchAnimeInfoAnilist(id);
  const animeInfoAnify = await fetchAnimeInfoAnify(id);
  return { animeInfoAnilist, animeInfoAnify };
}

export async function fetchPopularAnimes(perPage: number) {
  const { data: popularAnimes } = await axios.get(
    `${BASE_URL_ANILIST}/advanced-search?sort=["POPULARITY_DESC"]&perPage=${perPage}`
  );
  return popularAnimes as MultipleAnimeResponse;
}

export async function fetchEpisodeStreamLinks(episodeId: string) {
  const { data: episodeStreamLinks } = await axios.get(
    `${BASE_URL_ANILIST}/watch/${episodeId}`
  );
  return episodeStreamLinks as EpisodeStreamLinks;
}
