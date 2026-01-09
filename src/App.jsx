import { BrowserRouter, Routes, Route } from "react-router"
import MoviesList from "./pages/MovieList.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Wishlist from "./pages/WishList.jsx";
import Navbar from "./components/Navbar.jsx";
import "./styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;