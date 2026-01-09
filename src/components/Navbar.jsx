import { Link } from "react-router";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistProvider";
import styles from '../styles/Navbar.module.css'

function Navbar() {
    const { wishlist } = useContext(WishlistContext);

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}>InfoFilms</h1>

            <ul className={styles.links}>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <Link to="/wishlist">
                        Wishlist ({wishlist.length})
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar