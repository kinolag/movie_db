import { Link } from "@remix-run/react";
import { type MediaType } from "../models/result.server";
import TMDBsquare from "../assets/images/tmdb_blue_square_2_360.png";

export const IMG_LOCATION = "https://www.themoviedb.org/t/p/w220_and_h330_face";
export const LABELS = { movie: "Movie", tv: "TV Show" };

type CardProps = {
  id: number;
  titleOrName: string;
  imagePath: string;
  vote: number;
  overview: string;
  mediaType: MediaType;
};

const Card = ({
  id,
  titleOrName,
  imagePath,
  vote,
  overview,
  mediaType,
}: CardProps) => {
  const itemLabel = LABELS[mediaType];
  const imageUrl = imagePath ? `${IMG_LOCATION}${imagePath}` : TMDBsquare;
  const styles = {
    cardImage: {
      width: "90%",
      height: "200px",
      borderRadius: "6px",
      backgroundImage: `url(${imageUrl} )`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };

  return (
    <div className="card-wrapper txt-c">
      <div style={styles.cardImage} />
      <h4 className="y-spaced">
        <Link to={`/${mediaType}/${id}`} title="View Details">
          {titleOrName}
        </Link>
      </h4>
      {typeof vote === "number" && (
        <p>
          <span>Average Vote: </span>
          {vote}
        </p>
      )}
      <p>
        <span>Type: </span>
        {itemLabel}
      </p>
      <p className="centered">{overview}</p>
    </div>
  );
};

export default Card;
