import { SimpleLoading } from "@commons/components/SimpleLoading";
import { AccountRepository } from "@repositories/account/account.repository.abstract";
import { mockAccountRepository } from "@repositories/account/account.mock.repository";
import { useAccounts } from "./hooks/useAccounts";
import { SimpleErrorAndReload } from "@commons/components/SimpleErrorAndReload";
import { DueChargesRepository } from "@repositories/dueCharges/dueCharges.repository.abstract";
import { mockDueChargesRepository } from "@repositories/dueCharges/dueCharges.mock.repository";
import { Accounts } from "./Accounts";
import { SimpleModal } from "@/commons/components/SimpleModal/SimpleModal";
import { MakePaymentForm } from "./components/MakePaymentForm";
import { useMakePayment } from "./hooks/useMakePayment";

interface AccountsVCProps {
  accountRepository?: AccountRepository,
  dueChargesRepository?: DueChargesRepository
}

export const AccountsView = ({
  accountRepository = mockAccountRepository,
  dueChargesRepository = mockDueChargesRepository
}: AccountsVCProps) => {
  const { isSuccess, isFetching, error, refetchData, data } = useAccounts({
    accountRepository: accountRepository,
    dueChargesRepository: dueChargesRepository
  });
  const { onPaymentSubmit, closePaymentModal, openPaymentModal, showPaymentModal } = useMakePayment();

  if (!isFetching && isSuccess && data) {
    return <>
      <Accounts data={data} onPayClick={openPaymentModal}  />
      <SimpleModal isOpen={showPaymentModal} onClose={closePaymentModal}>
        <MakePaymentForm onSubmit={onPaymentSubmit} />
      </SimpleModal>
    </>;
  }

  if (!isSuccess && !isFetching) {
    return <SimpleErrorAndReload error={error.accounts ?? error.dueCharges} pageName={'Accounts'} reload={(refetchData)}/>;
  }

  return <SimpleLoading />;
};