export type MultipleAnimeResponse = {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  totalResults: number;
  results: Anime[];
};

export type Anime = {
  id: string;
  malId: number;
  title: Title;
  image: string;
  imageHash: string;
  trailer: Trailer;
  description: string;
  status: Status;
  cover: string;
  coverHash: string;
  rating: number;
  releaseDate: number;
  color: string | null;
  genres: string[];
  totalEpisodes: number;
  duration: number;
  type: string;
};

export type AnimeInfoAnilist = Anime & {
  synonyms: string[];
  isLicensed: boolean;
  isAdult: boolean;
  countryOfOrigin: string;
  popularity: number;
  startDate: EndDateClass;
  endDate: EndDateClass;
  currentEpisode: number;
  season: string;
  studios: string[];
  subOrDub: string;
  recommendations: Recommendation[];
  characters: Character[];
  relations: Relation[];
  mappings: Mapping[];
  artwork: Artwork[];
  episodes: Episode[];
};

export type Title = {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
};

export type Trailer = {
  id: string;
  site: string;
  thumbnail: string;
  thumbnailHash: string;
};

export type Artwork = {
  img: string;
  type: ArtworkType;
  providerId: ProviderID;
};

export enum ProviderID {
  Anilist = "anilist",
  Kitsu = "kitsu",
  Tvdb = "tvdb",
}

export enum ArtworkType {
  Banner = "banner",
  ClearArt = "clear_art",
  ClearLogo = "clear_logo",
  Icon = "icon",
  Poster = "poster",
  TopBanner = "top_banner",
}

export type Character = {
  id: number;
  role: Role;
  name: Name;
  image: string;
  imageHash: string;
  voiceActors: VoiceActor[];
};

export type Name = {
  first: string;
  last: null | string;
  full: string;
  native: null | string;
  userPreferred: string;
};

export enum Role {
  Main = "MAIN",
  Supporting = "SUPPORTING",
}

export type VoiceActor = {
  id: number;
  language: Language;
  name: Name;
  image: string;
  imageHash: string;
};

export enum Language {
  English = "English",
  French = "French",
  German = "German",
  Indonesian = "Indonesian",
  Italian = "Italian",
  Japanese = "Japanese",
  Korean = "Korean",
  Portuguese = "Portuguese",
  Spanish = "Spanish",
  Thai = "Thai",
}

export type EndDateClass = {
  year: number;
  month: number;
  day: number;
};

export type EpisodeToBeRendered = {
  id: string;
  title: string;
  number: number;
  image?: string | null;
};

export type Episode = {
  id: string;
  title: string;
  number: number;
  image?: string | null;
  img?: string | null;
};

export type EpisodeChunk = {
  startEp: number;
  endEp: number;
  episodes: EpisodeToBeRendered[];
};

export type Mapping = {
  id: string;
  providerId: string;
  similarity: number;
  providerType: string;
};

export type Recommendation = {
  id: number;
  malId: number;
  title: Title;
  status: Status;
  episodes: number | null;
  image: string;
  imageHash: string;
  cover: string;
  coverHash: string;
  rating: number;
  type: string;
};

export enum Status {
  Completed = "Completed",
  Ongoing = "Ongoing",
  NotYetAired = "Not yet aired",
  NOTYETRELEASED = "NOT_YET_RELEASED",
}

export type Relation = {
  id: number;
  relationType: string;
  malId: number;
  title: Title;
  status: Status;
  episodes: number | null;
  image: string;
  imageHash: string;
  color: string;
  type: string;
  cover: string;
  coverHash: string;
  rating: number;
};

export type EpisodeStreamLinks = {
  headers: Headers;
  sources: Source[];
  download: string;
};

export type Headers = {
  Referer: string;
};

export type Source = {
  url: string;
  isM3U8: boolean;
  quality: string;
};
