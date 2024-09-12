import { Anime } from "@/utils/types/animeAnilist";
import AnimeCard from "../../components/AnimeCard";

type CatalogAnimeList = {
  animeList: Anime[];
};

export default function CatalogAnimeList({ animeList }: CatalogAnimeList) {
  return (
    <div className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-4 xl:grid-cols-6 lg:gap-x-5 lg:gap-y-6">
      {animeList.map((anime, i) => (
        <AnimeCard key={anime.id ?? i} anime={anime} isHomePage />
      ))}
    </div>
  );
}
