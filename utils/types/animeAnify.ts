import { Episode } from "./animeAnilist";

export type AnimeInfoAnify = {
    id: string
    coverImage:  string;
    bannerImage: string;
    trailer:     string;
    title:       Title;
    description: string;
    rating:      Rating;
    type:        string;
    genres:      string[];
    episodes:    Episodes;
    totalEpisodes: number
    year: number
    //TV OR MOVIE
    format: string
    //RELEASING OR COMPLETED
    status: string
}

export type Episodes = {
    data:   Data[];
    latest: Latest;
}

export type Data = {
    episodes:   Episode[];
    providerId: string;
}

export type Latest = {
    updatedAt:     number;
    latestTitle:   string;
    latestEpisode: number;
}

export type Rating = {
    mal:     number;
    anidb:   number;
    kitsu:   number;
    anilist: number;
}

export type Title = {
    native:  string;
    romaji:  string;
    english: string;
}
