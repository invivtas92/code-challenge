import { AdjustedData } from "./hooks/useAccounts"
import styles from './Accounts.module.scss';
import { AccountCard } from "./components/AccountCard";

interface AccountProps {
  data: AdjustedData[],
  onPayClick: (id: string) => void,
}

export const Accounts = ({ data, onPayClick }: AccountProps) => {
  return <div className={styles.container}>
    <h1>Accounts</h1>
    {data.map((acc) => <AccountCard key={acc.id} address={acc.address} balance={acc.balance} id={acc.id} type={acc.type} onPayClick={onPayClick} />)}
  </div>
}