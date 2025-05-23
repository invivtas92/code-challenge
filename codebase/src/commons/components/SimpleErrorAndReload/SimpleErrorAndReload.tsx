import styles from './SimpleErrorAndReload.module.scss';

interface SimpleErrorProps {
  error: Error | null
  pageName: string
  reload?: () => void
}
export const SimpleErrorAndReload = ({ error, pageName, reload }: SimpleErrorProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}><span className={styles.errIcon} role="img" aria-label="warning">⚠️</span> Something went wrong in {pageName}.</h1>
      <h2 className={styles.message}>{error ? error.message : 'Unknown Error'}</h2>
      <button
        className={styles.reloadButton}
        onClick={reload ?? (() => {
          window.location.reload();
        })}
      >
          Reload
      </button>
    </div>
  )
};
