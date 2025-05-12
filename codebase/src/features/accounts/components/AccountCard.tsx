import styles from './AccountCard.module.scss';
import icon from '@assets/commons/react.svg';

interface AccountCardProps {
  id: string,
  type: string,
  address: string,
  balance: number,
  onPayClick: (id: string) => void
}

export const AccountCard = ({ id, type, address, balance, onPayClick }: AccountCardProps) => {
  return <div className={styles.container}>
    <img src={icon} className={styles.icon} alt={`Icon for ${id}`} />
    <div className={styles.accountDetails}>
      <p className={styles.type}>{type}</p>
      <p>{id}</p>
      <p className={styles.address}>{address}</p>
      <p>Account Balance:
        <span className={`${styles.balanceValue} ${balance > 0 ? styles['-positive'] : balance < 0 ? styles['-negative'] : styles['-neutral'] }`}>${balance}</span>
      </p>
      <button onClick={() => { onPayClick(id); }} className={styles.payButton}>Make a payment</button>
    </div>
  </div>
};