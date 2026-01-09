import { useContext, useState } from "react";
import { WishlistContext } from "../context/WishlistProvider";
import MovieCard from "../components/MovieCard";
import styles from "../styles/Wishlist.module.css"

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const [search, setSearch] = useState("");

  const filteredWishlist = wishlist.filter((movie) =>
    movie.title.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <div className={styles.container}>
      <h2>Ma Wishlist</h2>

      <input
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      {filteredWishlist.length === 0 ? (
        <p>Aucun film dans la wishlist.</p>
      ) : (
        <div className={styles.grid}>
          {filteredWishlist.map((movie) => (
            <div key={movie.id} className={styles.cardWrapper}>
              <MovieCard movie={movie} />
              <button
                className={styles.removeButton}
                onClick={() => removeFromWishlist(movie.id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;