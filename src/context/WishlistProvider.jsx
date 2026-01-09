import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie) => {
    setWishlist((prev) => {
      const alreadyInWishlist = prev.find((item) => item.id === movie.id);
      if (alreadyInWishlist) return prev;
      return [...prev, movie];
    });
  };

  const removeFromWishlist = (movieId) => {
    setWishlist((prev) =>
      prev.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider