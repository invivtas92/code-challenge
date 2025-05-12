import { useCallback, useState } from 'react';
import { FormState } from '../components/MakePaymentForm';

interface UseMakePaymentReturn {
  onPaymentSubmit: (formState: FormState, formData: FormData) => Promise<FormState> | FormState,
  showPaymentModal: boolean,
  closePaymentModal: () => void,
  openPaymentModal: (id: string) => void,
}

export const useMakePayment = (): UseMakePaymentReturn => {
  // TODO: use selectedAccount in onPaymentSubmit for sending due charges request for the account after form is submitted
  const [, setSelectedAccount] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const onPaymentSubmit = useCallback(async () => {
    // TODO: validate this formData from user input with validator class and put error in newFormState if it failed validation
    // const data = Object.fromEntries(formData);
    const newFormState: FormState = {
      success: true
    };
    
    // TODO: replace this with repository fn call to send due charges request to backend
    // fake sending payment request to backend 
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  
    return newFormState;
  }, []);

  const closePaymentModal = useCallback(() => {
    setShowPaymentModal(false);
  }, [setShowPaymentModal]);

  const openPaymentModal = useCallback((id: string) => {
    setSelectedAccount(id);
    setShowPaymentModal(true);
  }, [setShowPaymentModal]);

  return {
    onPaymentSubmit,
    showPaymentModal,
    closePaymentModal,
    openPaymentModal
  }
};

