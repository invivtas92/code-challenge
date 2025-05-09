import styles from './SimpleLoading.module.scss';

export const SimpleLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  )
};