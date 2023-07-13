import styles from './modal-comfirm-email.module.css';
import { useDispatch } from 'react-redux';
import { closeEmailModal } from '../../redux/reducers/email-reducer ';

export function ModalComfirmEmail() {

  const dispatch = useDispatch();

  function closeAllModal() {
    dispatch(closeEmailModal());
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => dispatch(closeAllModal)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.heading}>Подтвердите email</p>
          </div>
          <div className={styles.modalContent}>
            <p>На указанную почту отправлено письмо с ссылкой для подтверждения электронной почты.</p>
            <button type="submit" className={styles.button_long} onClick={() => dispatch(closeAllModal)}>Закрыть</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalComfirmEmail