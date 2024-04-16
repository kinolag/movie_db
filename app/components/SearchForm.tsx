import { Form } from "@remix-run/react";
import { useRef } from "react";

export default function SearchForm() {
  const form = useRef<HTMLFormElement>(null);
  return (
    <Form ref={form} className="search-wrapper">
      <>
        <fieldset>
          <div className="radio-wrapper">
            <input
              type="radio"
              id="movie"
              name="media-type"
              value="movie"
              defaultChecked
            />
            <label htmlFor="movie">Movie</label>
          </div>
          <div className="radio-wrapper">
            <input
              type="radio"
              id="tv"
              name="media-type"
              value="tv"
            />
            <label htmlFor="tv">TV</label>
          </div>
        </fieldset>
        <input
          type="text"
          name="query"
          placeholder="Search Shows"
        />
        <button type="submit">Search</button>
      </>
    </Form>
  );
}
