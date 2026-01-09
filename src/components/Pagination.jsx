import styles from "../styles/modules/Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      <span className={styles.pageInfo}>
        {currentPage} / {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;