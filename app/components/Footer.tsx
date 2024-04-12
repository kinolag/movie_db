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
    </footer>
  );
}