import { test } from "vitest";
import { render, screen } from "@testing-library/react";
import Details from "../components/Details";
import { testMovieDetails, testTvShowDetails } from "../mocks/typedResults";

test("renders Details component with expected text elements for Movie", () => {
  render(<Details mediaType="movie" itemDetails={testMovieDetails} />);
  screen.findByText("Type: Movie");
  screen.findByText("Release Date");
});

test("renders Details component with expected text elements for Tv", () => {
  render(<Details mediaType="tv" itemDetails={testTvShowDetails} />);
  screen.findByText("Type: TV Show");
  screen.findByText("First Air Date");
});
