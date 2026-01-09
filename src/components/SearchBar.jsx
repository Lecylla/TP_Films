import { useEffect, useState } from "react";
import styles from "../styles/modules/SearchBar.module.css";

const SearchBar = ({ onResults, onSearchStateChange, page }) => {
  const [query, setQuery] = useState("");

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  
  useEffect(() => {
    if (query.trim() === "") {
      onSearchStateChange(false);
      return;
    }

    onSearchStateChange(true);

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        onResults(data.results || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Erreur recherche :", err);
        }
      }
    }, 500); // debounce

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, page]);

  return (
    <input
      type="text"
      placeholder="Rechercher un film..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className={styles.search}
    />
  );
};

export default SearchBar;