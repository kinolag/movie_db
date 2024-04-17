/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

test("renders Footer component", () => {
  render(<Footer />);
  screen.findByText("Developed by kinolag");
});
