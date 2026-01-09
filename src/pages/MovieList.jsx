import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";
import "../styles/MovieList.css";

function MovieList() {

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) return;
    fetchMovies();
  }, [category, page, isSearching]);


  const fetchMovies = async () => {
    setLoading(true);

    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Erreur catégories :", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      {/* Recherche */}
      <SearchBar
        onResults={(results) => {
          setMovies(results);
          setLoading(false);
        }}
        onSearchStateChange={(state) => {
          setIsSearching(state);
          setPage(1);
        }}
        page={page}
      />


      {/* Catégories */}
      <div className="categories">
        <button onClick={() => setCategory("now_playing")}>Now Playing</button>
        <button onClick={() => setCategory("popular")}>Popular</button>
        <button onClick={() => setCategory("top_rated")}>Top Rated</button>
        <button onClick={() => setCategory("upcoming")}>Upcoming</button>
      </div>

      {/* Liste */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div>
          <div className="grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}

export default MovieList;