
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

export async function getResults(
  source: PageSource,
  mediaType: MediaType,
  query: string = "",
  page: number = 1
): Promise<void | Array<Movie | TvShow>> {
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

  let results: Array<Movie | TvShow> = [];
  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(Object.keys(data));
        if (Array.isArray(data.results)) {
          /* results from search have no media_type */
          results = data.results.map((r: Result) => {
            return { ...r, media_type: mediaType };
          });
        }
      });
    return results;
  } catch (e) {
    console.log("An error occurred while fetching the results: ", e);
  }
}
