import styles from "../styles/modules/SearchBar.module.css";

const LocalSearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher dans la wishlist..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.search}
    />
  );
};

export default LocalSearchBar;
