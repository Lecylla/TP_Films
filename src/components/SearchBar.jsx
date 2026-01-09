import styles from "../styles/modules/SearchBar.module.css"

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Rechercher un film..."
      className={styles.search}
    />
  );
}

export default SearchBar;