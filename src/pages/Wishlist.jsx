import { useContext, useState } from "react";
import { WishlistContext } from "../context/WishlistProvider.jsx";
import MovieCard from "../components/MovieCard.jsx";
import LocalSearchBar from "../components/LocalSearchBar.jsx";
import Pagination from "../components/Pagination.jsx";
import "../styles/Wishlist.css"

function Wishlist() {
  const { wishlist } = useContext(WishlistContext);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const moviesPerPage = 20; // Nombre de films par page

  // Filtrage selon la recherche
  const filteredWishlist = wishlist.filter((movie) =>
    movie.title.toUpperCase().includes(search.toUpperCase())
  );

  // Pagination : calcul des films à afficher
  const totalPages = Math.ceil(filteredWishlist.length / moviesPerPage);
  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const moviesToDisplay = filteredWishlist.slice(startIndex, endIndex);

  return (
    <div className="container">
      <LocalSearchBar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {filteredWishlist.length === 0 ? (
        <p>Aucun film dans la wishlist.</p>
      ) : (
        <>
          <div className="grid">
            {moviesToDisplay.map((movie) => (
              <div key={movie.id} className="cardWrapper">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Wishlist;