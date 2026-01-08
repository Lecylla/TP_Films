import { Link } from "react-router";
import styles from "../styles/MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className={styles.card}>
      <img
        src={imageUrl}
        alt={movie.title}
        className={styles.poster}
      />

      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.rating}>⭐ {movie.vote_average}</p>

        <Link to={`/movie/${movie.id}`} className={styles.button}>
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
