import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import styles from '../styles/MovieList.module.css'
import { API_KEY, BASE_URL } from '../api/constantes.js'

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toUpperCase().includes(search.toUpperCase())
  );

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

  return (
    <div className={styles.container}>
      {/* Recherche */}
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      {/* Catégories */}
      <div className={styles.categories}>
        <button onClick={() => setCategory("now_playing")}>Now Playing</button>
        <button onClick={() => setCategory("popular")}>Popular</button>
        <button onClick={() => setCategory("top_rated")}>Top Rated</button>
        <button onClick={() => setCategory("upcoming")}>Upcoming</button>
      </div>

      {/* Liste */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className={styles.grid}>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;