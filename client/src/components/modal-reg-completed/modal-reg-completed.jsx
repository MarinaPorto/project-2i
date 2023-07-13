import styles from './modal-reg-completed.module.css';
// import styles from './modal-reg-completed-pers.module.css';
import { useDispatch } from 'react-redux';
import { closeRegFinishModal } from '../../redux/reducers/registration-finish';
import { openEntranceModal } from '../../redux/reducers/entrance-reducer';

export function ModalRegCompleted() {

  const dispatch = useDispatch();

  function closeAllModal() {
    dispatch(closeRegFinishModal());
  }

  function openEntranceModalWindow() {
    dispatch(closeRegFinishModal());
    dispatch(openEntranceModal());
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => dispatch(closeAllModal)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.heading}>Регистрация завершена</p>
          </div>
          <div className={styles.modalContent}>
            <p>Регистрация успешно завершена, можно приступать к работе.</p>
            <button type="submit" className={styles.button_long} onClick={() => dispatch(openEntranceModalWindow)}>Войти</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalRegCompleted