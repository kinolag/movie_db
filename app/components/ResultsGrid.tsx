import { type Movie, type TvShow, MediaType } from "../models/result.server";
import Card from "./Card";

export default function ResultsGrid({
  results,
}: {
  results: Array<Movie | TvShow>;
}): React.ReactNode {
  return (
    <div className="responsive-grid">
      {results
        .sort((a, b) => b.vote_average - a.vote_average)
        .map((r) => {
          const titleOrName = "title" in r ? r.title : r.name;
          return (
            <Card
              key={r.id}
              id={r.id}
              imagePath={r.poster_path}
              titleOrName={titleOrName}
              overview={r.overview}
              mediaType={r.media_type as MediaType}
              vote={r.vote_average}
            />
          );
        })}
    </div>
  );
}
