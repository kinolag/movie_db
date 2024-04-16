import TMDBlong from "../assets/images/tmdb_blue_long.svg";

export default function Footer() {
  return (
    <footer>
      <div>Data provided by</div>
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noreferrer"
        title="TMDB"
      >
        <img src={TMDBlong} alt="The Movie Database logo" />
      </a>
      <div>
        Developed by{" "}
        <a
          href="https://github.com/kinolag"
          target="_blank"
          rel="noreferrer"
          title="Developer's GitHub page"
        >
          kinolag
        </a> (2024) using React, Remix, TS
      </div>
    </footer>
  );
}