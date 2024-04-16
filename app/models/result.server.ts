
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

/* testing retrieved objects against types */

export const testMovieDetails: MovieDetails = {
  adult: false,
  backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  belongs_to_collection: {
    id: 726871,
    name: "Dune Collection",
    poster_path: "/wcVafar6Efk3YgFvh8oZQ4yHL6H.jpg",
    backdrop_path: "/ygVSGv86R0BTOKJIb8RQ1sFxs4q.jpg",
  },
  budget: 190000000,
  genres: [
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 12,
      name: "Adventure",
    },
  ],
  homepage: "https://www.dunemovie.com",
  id: 693134,
  imdb_id: "tt15239678",
  original_language: "en",
  original_title: "Dune: Part Two",
  overview:
    "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
  popularity: 4661.985,
  poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  production_companies: [
    {
      id: 923,
      logo_path: "/8M99Dkt23MjQMTTWukq4m5XsEuo.png",
      name: "Legendary Pictures",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: "2024-02-27",
  revenue: 683813734,
  runtime: 167,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: "Released",
  tagline: "Long live the fighters.",
  title: "Dune: Part Two",
  video: false,
  vote_average: 8.308,
  vote_count: 2814,
};

export const testTvShowDetails: TvShowDetails = {
  adult: false,
  backdrop_path: "/xMNH87maNLt9n2bMDYeI6db5VFm.jpg",
  created_by: [],
  episode_run_time: [24],
  first_air_date: "2024-01-07",
  genres: [
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
  ],
  homepage: "https://sololeveling-anime.net",
  id: 127532,
  in_production: true,
  languages: ["ja"],
  last_air_date: "2024-03-30",
  last_episode_to_air: {
    id: 4996500,
    overview:
      "Drained from endless battle, Jinwoo sees a phantom of his past self. To overcome his own past as the Weakest Hunter of All Mankind, he struggles to find a way to clear the job-change quest.",
    name: "Arise",
    vote_average: 9.667,
    vote_count: 3,
    air_date: "2024-03-30",
    episode_number: 12,
    episode_type: "finale",
    production_code: "",
    runtime: 24,
    season_number: 1,
    show_id: 127532,
    still_path: "/6kjROrp76VDJyfImdqUzmL7zdJM.jpg",
  },
  name: "Solo Leveling",
  next_episode_to_air: null,
  networks: [
    {
      id: 343,
      logo_path: "/9rNqtDYAnD6yTOutvHI3synSEs2.png",
      name: "Gunma TV",
      origin_country: "JP",
    },
    {
      id: 614,
      logo_path: "/hSdroyVthq3CynxTIIY7lnS8w1.png",
      name: "Tokyo MX",
      origin_country: "JP",
    },
    {
      id: 861,
      logo_path: "/JQ5bx6n7Qmdmyqz6sqjo5Fz2iR.png",
      name: "BS11",
      origin_country: "JP",
    },
    {
      id: 2478,
      logo_path: "/2v82HpzoKRveJEJcGHkeTcktMRM.png",
      name: "Tochigi TV",
      origin_country: "JP",
    },
  ],
  number_of_episodes: 12,
  number_of_seasons: 1,
  origin_country: ["JP"],
  original_language: "ja",
  original_name: "俺だけレベルアップな件",
  overview:
    "They say whatever doesn’t kill you makes you stronger, but that’s not the case for the world’s weakest hunter Sung Jinwoo. After being brutally slaughtered by monsters in a high-ranking dungeon, Jinwoo came back with the System, a program only he could see, that’s leveling him up in every way. Now, he’s inspired to discover the secrets behind his powers and the dungeon that spawned them.",
  popularity: 553.891,
  poster_path: "/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
  production_companies: [
    {
      id: 13113,
      logo_path: "/xV5tPYKZhP2Ko9dOh5A3FahuKsx.png",
      name: "A-1 Pictures",
      origin_country: "JP",
    },
    {
      id: 2883,
      logo_path: "/rDYExnBV61jGQnkhVVrPN4Yl7O1.png",
      name: "Aniplex",
      origin_country: "JP",
    },
    {
      id: 163862,
      logo_path: null,
      name: "Netmarble",
      origin_country: "KR",
    },
    {
      id: 217720,
      logo_path: null,
      name: "D&C Media",
      origin_country: "KR",
    },
    {
      id: 210441,
      logo_path: "/kRGq6Eo3OgwnuLxijYYUIRpeCj9.png",
      name: "Kakao piccoma",
      origin_country: "JP",
    },
    {
      id: 198847,
      logo_path: "/lLOwYgpMNq7o1vhK9m8yL13Sc0Y.png",
      name: "Crunchyroll",
      origin_country: "US",
    },
    {
      id: 98553,
      logo_path: "/lLOwYgpMNq7o1vhK9m8yL13Sc0Y.png",
      name: "Crunchyroll",
      origin_country: "JP",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "JP",
      name: "Japan",
    },
    {
      iso_3166_1: "KR",
      name: "South Korea",
    },
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  seasons: [
    {
      air_date: "2024-02-25",
      episode_count: 1,
      id: 379694,
      name: "Specials",
      overview: "",
      poster_path: "/uFmLbRL1LyHSgoGMI7hQ8bZ4Juf.jpg",
      season_number: 0,
      vote_average: 0,
    },
    {
      air_date: "2024-01-07",
      episode_count: 12,
      id: 199167,
      name: "Season 1",
      overview: "",
      poster_path: "/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
      season_number: 1,
      vote_average: 7.7,
    },
  ],
  spoken_languages: [
    {
      english_name: "Japanese",
      iso_639_1: "ja",
      name: "日本語",
    },
  ],
  status: "Returning Series",
  tagline: "He used to be the weakest.",
  type: "Scripted",
  vote_average: 8.699,
  vote_count: 272,
};
