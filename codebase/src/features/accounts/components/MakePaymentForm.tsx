import { SimpleLoading } from '@commons/components/SimpleLoading';
import styles from './MakePaymentForm.module.scss';
import { useActionState } from 'react';

interface FormState {
  success?: boolean
}

interface MakePaymentFormProps {
  onSubmit: (formState: FormState, formData: FormData) => Promise<FormState> | FormState,
};

export const MakePaymentForm = ({ onSubmit }: MakePaymentFormProps) => {
  const [formState, formAction, formPending] = useActionState<FormState, FormData>(async (formState, formData) => {
    const newFormState = await onSubmit(formState, formData);

    return newFormState;
  }, {});

  if (formPending) {
    return <div className={styles.container}>
      <SimpleLoading text='Submitting...'/>
    </div>;
  }

  if (formState.success) {
    return <div className={`${styles.container} ${styles['-centered']}`}>Success!</div>;
  }

  return <form className={styles.container} action={formAction}>
    <label htmlFor='amount'>How much would you like to pay?</label>
    <input id='amount' name='amount' placeholder='10' type='number'  />
    <label htmlFor='cardNumber'>Card number</label>
    <input id='cardNumber' name='cardNumber' placeholder='1234 5678 9012 3456'  />
    <div className={styles.expAndCvvContainer}>
      <label htmlFor='expiry'>Expiry date: </label>
      <input id='expiry' name='expiry' placeholder='01/25'  />
      <label htmlFor='cvv'>CVV: </label>
      <input id='cvv' name='cvv' />
    </div>
    <button className={styles.payButton} type='submit'>Pay</button>
  </form>;
};

export type { FormState };