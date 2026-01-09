import { useContext } from "react";
import { WishlistContext } from "../context/WishlistProvider.jsx";
import styles from "../styles/modules/BoutonWishlist.module.css";

const BoutonWishlist = ({ movie }) => {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const isInWishlist = wishlist.some(
    (item) => item.id === movie.id
  );

  return (
    <div>
      {isInWishlist ? (
        <button
          className={styles.btnwishlist}
          onClick={() => removeFromWishlist(movie.id)}
        >
          <img src="/icone_is_fav.png" alt="Retirer de la Wishlist" width={35} />
        </button>
      ) : (
        <button
          onClick={() => addToWishlist(movie)}
          className={styles.btnwishlist}
        >
          <img src="/icone_fav.png" alt="Ajouter à la Wishlist" width={35} />
        </button>
      )}
    </div>
  );
};

export default BoutonWishlist;
