import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header>
      <nav>
        <h3>Movie DB App</h3>
        <Link to="/" title="Homepage">
          Trending
        </Link>
        <Link to="/search" title="Search">
          Search
        </Link>
      </nav>
    </header>
  );
}
