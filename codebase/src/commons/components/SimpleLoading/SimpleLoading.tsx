import styles from './SimpleLoading.module.scss';

interface SimpleLoadingProps {
  text?: string
}
export const SimpleLoading = ({ text = 'Loading...' }: SimpleLoadingProps) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <p className={styles.loadingText}>{text}</p>
    </div>
  )
};