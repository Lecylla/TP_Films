import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import styles from '../styles/MovieList.module.css'
import { API_KEY, BASE_URL } from '../api/tmdb.js'

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [category]);

  const fetchMovies = async () => {
    setLoading(true);

    const url = `${BASE_URL}movie/${category}?api_key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    setMovies(data.results);
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);

    const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${search}`;
    const response = await fetch(url);
    const data = await response.json();

    setMovies(data.results);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2>Films</h2>

      {/* Catégories */}
      <div className={styles.categories}>
        <button onClick={() => setCategory("now_playing")}>Now Playing</button>
        <button onClick={() => setCategory("popular")}>Popular</button>
        <button onClick={() => setCategory("top_rated")}>Top Rated</button>
        <button onClick={() => setCategory("upcoming")}>Upcoming</button>
      </div>

      {/* Recherche */}
      <form onSubmit={handleSearch} className={styles.search}>
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>

      {/* Liste */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;