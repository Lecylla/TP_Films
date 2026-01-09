import { Link } from "react-router";
import BoutonWishlist from "../components/BoutonWishlist.jsx";
import styles from "../styles/modules/MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className={styles.card}>
      <BoutonWishlist movie={movie} />
      <Link to={`/movie/${movie.id}`} >
        <img
          src={imageUrl}
          alt={movie.title}
          className={styles.poster}
        />

        <div className={styles.content}>
          <h3 className={styles.title}>{movie.title}</h3>
          <p className={styles.rating}>⭐ {movie.vote_average}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
