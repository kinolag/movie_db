import { type Movie, type TvShow, MediaType } from "../models/result.server";
import Card, { type CardProps } from "./Card";
import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export const NAVIGATION_KEYS = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ENTER: "Enter",
};

export default function ResultsGrid({
  results,
}: {
  results: Array<Movie | TvShow>;
}): React.ReactNode {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Movie | TvShow | undefined>(
    results[0]
  );

  const getRect = (
    id: number
  ): { el: HTMLElement; x: number; y: number } | undefined => {
    const el: HTMLElement | null = document.getElementById(String(id));
    const rect = el?.getBoundingClientRect();
    if (el && rect) {
      const x = rect.left + window.scrollX;
      const y = rect.top + window.scrollY;
      return { el, x, y };
    } else return undefined;
  };

  const handleSelect = (id: number) => {
    const newSelected = results.find((r) => r.id === id);
    setSelected(newSelected);
  };

  useEffect(() => {
    const handleKeyPress = (e: { key: string }) => {
      if (results.length === 0) {
        return;
      }
      if (selected && e.key === NAVIGATION_KEYS.ARROW_RIGHT) {
        const nextIndex = results.indexOf(selected) + 1;
        if (!results[nextIndex]) return;

        const nextSibling = document.getElementById(
          String(results[nextIndex].id)
        );
        if (!nextSibling) return;

        setSelected(results[nextIndex]);
        nextSibling.scrollIntoView();
      } else if (selected && e.key === NAVIGATION_KEYS.ARROW_LEFT) {
        const prevIndex = results.indexOf(selected) - 1;
        if (!results[prevIndex]) return;

        const prevSibling = document.getElementById(
          String(results[prevIndex].id)
        );
        if (!prevSibling) return;
        prevSibling.scrollIntoView();
        setSelected(results[prevIndex]);
      } else if (selected && e.key === NAVIGATION_KEYS.ARROW_UP) {
        const rect = getRect(selected.id);

        // loop back in the results and select the first element
        // that is above the current selected element and has the same x coordinate
        for (let i = results.indexOf(selected) - 1; i >= 0; i--) {
          const prev = getRect(results[i].id);

          if (rect && rect.x === prev?.x && rect.y > prev?.y) {
            setSelected(results[i]);
            prev.el.scrollIntoView();
            break;
          }
        }
      } else if (selected && e.key === NAVIGATION_KEYS.ARROW_DOWN) {
        const rect = getRect(selected.id);

        // loop forward in the results and select the first element
        // that is below the current selected element and has the same x coordinate
        for (let i = results.indexOf(selected) + 1; i < results.length; i++) {
          const next = getRect(results[i].id);
          if (rect && rect.x === next?.x && rect.y < next.y) {
            setSelected(results[i]);
            next.el.scrollIntoView();
            break;
          }
        }
      } else if (e.key === NAVIGATION_KEYS.ENTER) {
        navigate(`/${selected?.media_type}/${selected?.id}`);
      }
    };

    if (!selected) {
      setSelected(results[0]);
    }
    document.addEventListener("keyup", handleKeyPress);
    return () => document.removeEventListener("keyup", handleKeyPress);
  }, [navigate, results, selected]);

  return (
    <div className="responsive-grid">
      {results
        .sort((a, b) => b.vote_average - a.vote_average)
        .map((r) => {
          const cardProps: CardProps = {
            id: r.id,
            imagePath: r.poster_path,
            titleOrName: "title" in r ? r.title : r.name,
            overview: r.overview,
            mediaType: r.media_type as MediaType,
            vote: r.vote_average,
            isSelected: r.id === selected?.id,
            handleSelect: handleSelect,
          };
          return <Card key={r.id} cardProps={cardProps} />;
        })}
    </div>
  );
}
