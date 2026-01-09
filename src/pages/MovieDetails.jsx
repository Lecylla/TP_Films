import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { WishlistContext } from "../context/WishlistProvider";
import MovieCard from "../components/MovieCard.jsx";
import styles from "../styles/MovieDetail.module.css";
import { API_KEY, BASE_URL } from '../api/tmdb.js'

function MovieDetail() {
  const { id } = useParams();
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const isInWishlist = wishlist.some((item) => item.id === Number(id));

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    setLoading(true);

    const movieRes = await fetch(
      `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=fr-FR`
    );
    const movieData = await movieRes.json();

    const creditsRes = await fetch(
      `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`
    );
    const creditsData = await creditsRes.json();

    const similarRes = await fetch(
      `${BASE_URL}movie/${id}/similar?api_key=${API_KEY}&language=fr-FR`
    );
    const similarData = await similarRes.json();

    setMovie(movieData);
    setCast(creditsData.cast.slice(0, 10));
    setSimilarMovies(similarData.results);
    setLoading(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (!movie) return <p>Film introuvable</p>;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
    : null;

  return (
    <div className={styles.container}>
      {/* Détails du film */}
      <div className={styles.details}>
        {imageUrl && <img src={imageUrl} alt={movie.title} />}

        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p><strong>Date de sortie :</strong> {movie.release_date}</p>
          <p><strong>Note :</strong> ⭐ {movie.vote_average}</p>

          {isInWishlist ? (
            <button onClick={() => removeFromWishlist(movie.id)}>
              Retirer de la wishlist
            </button>
          ) : (
            <button onClick={() => addToWishlist(movie)}>
              Ajouter à la wishlist
            </button>
          )}
        </div>
      </div>

      {/* Acteurs */}
      <section className={styles.section}>
        <h3>Acteurs principaux</h3>
        <ul className={styles.cast}>
          {cast.map((actor) => (
            <li key={actor.id}>
              {actor.name} – {actor.character}
            </li>
          ))}
        </ul>
      </section>

      {/* Films similaires */}
      <section className={styles.section}>
        <h3>Films similaires</h3>
        <div className={styles.grid}>
          {similarMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MovieDetail;