export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    video: boolean;
    vote_count: number;
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  };
  
  export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };

  export type Genre = { id: number; name: string };

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Genre[];
  tagline: string;
};

export type Cast = { id: number; name: string; character?: string; profile_path: string };
export type Crew = { id: number; name: string; job: string; profile_path: string };
export type CreditsResponse = { id: number; cast: Cast[]; crew: Crew[] };