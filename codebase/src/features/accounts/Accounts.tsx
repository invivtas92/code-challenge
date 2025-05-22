import { AdjustedData } from "./hooks/useAccounts"
import styles from './Accounts.module.scss';
import { AccountCard } from "./components/AccountCard";
import { useAppTranslation } from "@/infra/i18n/useAppTranslation";

interface AccountProps {
  data: AdjustedData[],
  onPayClick: (id: string) => void,
}

export const Accounts = ({ data, onPayClick }: AccountProps) => {
  const { translate } = useAppTranslation('accounts');
  return <div className={styles.container}>
    <h1>{translate('accounts')}</h1>
    {data.map((acc) => <AccountCard key={acc.id} address={acc.address} balance={acc.balance} id={acc.id} type={acc.type} onPayClick={onPayClick} />)}
  </div>
}