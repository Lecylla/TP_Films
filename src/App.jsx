import { BrowserRouter, Routes, Route } from "react-router"
import MoviesList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import Wishlist from "./pages/WishList";
import Navbar from "./components/Navbar";
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