import {
  type MediaType,
  type MovieDetails,
  type TvShowDetails,
} from "~/models/result.server";
import { IMG_LOCATION } from "../components/Card";
import TMDBsquare from "../assets/images/tmdb_blue_square_2_360.png";
import { useParams } from "@remix-run/react";

type DetailsProps = {
  mediaType: MediaType;
  itemDetails: MovieDetails | TvShowDetails;
};

export default function Details({
  mediaType,
  itemDetails,
}: DetailsProps): React.ReactNode {
  const params = useParams();
  const titleOrName =
    "title" in itemDetails ? itemDetails.title : itemDetails.name;
  const itemLabel = mediaType === "tv" ? "TV Show" : "Movie";
  return (
    <>
      {itemDetails.id ? (
        <div className="card-wrapper">
          <h3>{titleOrName}</h3>
          <img
            src={
              itemDetails.poster_path
                ? `${IMG_LOCATION}${itemDetails.poster_path}`
                : TMDBsquare
            }
            alt={titleOrName}
            title={titleOrName}
          />
          <p>
            <em>{itemDetails.tagline}</em>
          </p>
          <p>
            <span>Type: </span>
            {itemLabel}
          </p>
          <p>
            <span>Genres: </span>
            {itemDetails.genres?.map((g) => g.name).join(" | ")}
          </p>
          {"number_of_seasons" in itemDetails && (
            <p>
              <span>Number of Seasons: </span>
              {itemDetails.number_of_seasons}
            </p>
          )}
          <p>
            <span>Spoken Languages: </span>
            {itemDetails.spoken_languages?.map((g) => g.name).join(" | ")}
          </p>
          <p>
            <span>Average Vote: </span>
            {itemDetails.vote_average}
          </p>
          {"release_date" in itemDetails ? (
            <p>
              <span>Release Date: </span>
              {itemDetails.release_date}
            </p>
          ) : (
            <p>
              <span>First Air Date: </span>
              {itemDetails.first_air_date}
            </p>
          )}
          <p>
            <span>TMDB ID: </span>
            {itemDetails.id}
          </p>
          {itemDetails.homepage && (
            <p>
              <a
                href={itemDetails.homepage}
                target="_blank"
                rel="noreferrer"
                title="Show Homepage"
              >
                {itemLabel} Homepage
              </a>
            </p>
          )}
        </div>
      ) : (
        <p>{`Could not retrieve details for ${itemLabel} with id: ${params.id}`}</p>
      )}
    </>
  );
}
