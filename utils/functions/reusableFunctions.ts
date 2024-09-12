import {
  EpisodeChunk,
  EpisodeToBeRendered,
  Episode,
} from "../types/animeAnilist";
import { Data } from "../types/animeAnify";
import { AnimeInfoAnizip } from "../types/animeAnizip";

export function chunkEpisodes(
  eps: EpisodeToBeRendered[] | null,
  epsPerChunk: number
): EpisodeChunk[] | null {
  if (!eps) return null;
  const chunkedEpisodes = Array.from(
    { length: Math.ceil(eps.length / epsPerChunk) },
    (_, i) => {
      const start = i * epsPerChunk + 1;
      const end = Math.min((i + 1) * epsPerChunk, eps.length);
      return {
        startEp: start,
        endEp: end,
        episodes: eps.slice(i * epsPerChunk, (i + 1) * epsPerChunk),
      };
    }
  );
  return chunkedEpisodes;
}

export function getEpisodesToBeRendered(
  anifyEpisodes: Data[] | null | undefined,
  anilistEpisodes: Episode[] | null | undefined,
  animeInfoAnizip: AnimeInfoAnizip | null | undefined
): EpisodeToBeRendered[] | null {
  //getting anify anime episodes from different providers
  const gogoAnimeData = anifyEpisodes?.find(
    (epData) => epData.providerId === "gogoanime"
  );
  const zoroData = anifyEpisodes?.find(
    (epData) => epData.providerId === "zoro"
  );

  //anify episodes to be used for streaming (gogoanime only)
  const gogoAnimeEpisodes = gogoAnimeData ? gogoAnimeData.episodes : null;

  if (gogoAnimeEpisodes && gogoAnimeEpisodes.length !== 0) {
    const a = gogoAnimeEpisodes.map((ep, i) => {
      return {
        //get episode ids from gogoanime
        id: ep.id,
        number: ep.number,

        image: animeInfoAnizip?.episodes[i + 1].image,
        //get episode titles from zoro
        title:
          zoroData && zoroData.episodes[i]
            ? zoroData.episodes[i].title
            : animeInfoAnizip?.episodes[i + 1].title.en ?? `EP ${ep.number}`,
      };
    });
    return a;
  } else if (anilistEpisodes && anilistEpisodes.length !== 0) {
    const a = anilistEpisodes.map((ep, i) => ({
      id: ep.id,
      title:
        animeInfoAnizip?.episodes[i + 1].title.en ??
        ep.title ??
        `EP ${ep.number}`,
      number: ep.number,
      image: animeInfoAnizip?.episodes[i + 1].image ?? ep.image,
    }));
    return a;
  } else {
    //else, accept the fact that the selected anime has no episodes
    return null;
  }
}

export function getRatingScore(rating: number) {
  const decimal = (rating * 10).toString().split(".")[1];
  if (!decimal || decimal.length < 1) return (0.05 * (rating * 10)).toFixed(1);
  return (0.05 * (rating * 10)).toFixed(2);
}
