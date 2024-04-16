/**
 * from "trending" or "search" API endpoints
 * API URLs
 * https://api.themoviedb.org/3/trending/movie/week
 * https://api.themoviedb.org/3/trending/tv/week
 * https://api.themoviedb.org/3/search/movie
 * https://api.themoviedb.org/3/search/tv
 **/

export type MediaType = "tv" | "movie";
type PageSource = "trending" | "search";

export type Movie = {
  backdrop_path: string;
  id: number;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  adult: boolean;
  name: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

export type TvShow = {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Result = {
  id: number;
  vote_average: number;
  poster_path: string;
  original_title: string;
  name?: string;
  title?: string;
  overview: string;
  media_type: MediaType;
};

const apiKey = process.env.TMDB_API_KEY;
const baseUrl = process.env.TMDB_API_BASEURL;

export type Output = {
  results: Array<Movie | TvShow>;
  page: number;
  totalPages: number;
};
export async function getResults(
  source: PageSource,
  mediaType: MediaType,
  query: string = "",
  page: number = 1
): Promise<void | Output> {
  const PATHS = {
    trending: `${source}/${mediaType}/week`,
    search: `${source}/${mediaType}`,
  };
  const path = PATHS[source];

  const url =
    baseUrl +
    path +
    "?" +
    `api_key=${apiKey}` +
    `&query=${query}` +
    `&page=${page}`;
  console.log("Fetch URL: ", url);

  const output: Output = {
    results: [],
    page: 1,
    totalPages: 0,
  };
  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.results)) {
          /* results from search have no media_type */
          output.results = data.results.map((r: Result) => {
            return { ...r, media_type: mediaType };
          });
          output.page = data.page;
          output.totalPages = data.total_pages;
        }
      });
    return output;
  } catch (e) {
    console.log("An error occurred while fetching the results: ", e);
  }
}

/**
 * from "details" API endpoints (single item by id)
 * API URLs
 * https://api.themoviedb.org/3/movie/{movie_id}
 * https://api.themoviedb.org/3/tv/{series_id}
 **/

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TvShowDetails = {
  adult: boolean;
  backdrop_path: string;
  created_by: string[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    overview: string;
    name: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: null;
  networks: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  seasons: Array<{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export async function getItemDetails(
  mediaType: MediaType,
  id: string
): Promise<void | MovieDetails | TvShowDetails> {
  const path = `${mediaType}/${id}`;
  const url = baseUrl + path + "?" + `api_key=${apiKey}`;
  console.log("Fetch URL: ", url);
  let resultDetails: MovieDetails | TvShowDetails | undefined;
  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        resultDetails = data;
      });
    return resultDetails;
  } catch (e) {
    console.log("An error occurred while fetching the item details: ", e);
  }
}
