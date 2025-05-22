import { useAppTranslation } from '@/infra/i18n/useAppTranslation';
import styles from './SimpleLoading.module.scss';


interface SimpleLoadingProps {
  text?: string
}
export const SimpleLoading = ({ text }: SimpleLoadingProps) => {
  const { translate } = useAppTranslation('commons');
  
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <p className={styles.loadingText}>{text ?? translate('hello', { name: 'asd' })}</p>
    </div>
  )
};