import styles from './modal-sf.module.css';
import { useDispatch } from 'react-redux';
import { closeSFModal } from '../../redux/reducers/sf-reducer';
import { NavLink } from 'react-router-dom';

export function ModalSF() {

  const dispatch = useDispatch();

  function closeAllModal() {
    dispatch(closeSFModal());
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => dispatch(closeAllModal)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.heading}>Запрос отправлен
            </p>
          </div>
          <div className={styles.modalContent}>
            <p>На указанную почту будет отправлено письмо с счёт-фактуры на оплату</p>
            <NavLink to="/main-registered" onClick={() => dispatch(closeAllModal)}>
              <button type="submit" className={styles.button_long}>
                Закрыть</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalSF