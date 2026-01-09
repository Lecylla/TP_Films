import { useContext, useState } from "react";
import { WishlistContext } from "../context/WishlistProvider.jsx";
import MovieCard from "../components/MovieCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import "../styles/Wishlist.css"

function Wishlist() {
  const { wishlist } = useContext(WishlistContext);
  const [search, setSearch] = useState("");

  const filteredWishlist = wishlist.filter((movie) =>
    movie.title.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <div className="container">
      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {filteredWishlist.length === 0 ? (
        <p>Aucun film dans la wishlist.</p>
      ) : (
        <div className="grid">
          {filteredWishlist.map((movie) => (
            <div key={movie.id} className="cardWrapper">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;