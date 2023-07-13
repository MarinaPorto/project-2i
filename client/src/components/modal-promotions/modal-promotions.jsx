import styles from './modal-promotions.module.css';
// import styles from './modal-promotions-pers.module.css';
import { useDispatch } from 'react-redux';
import { closeModalPromo } from '../../redux/reducers/modal-promo';

export function ModalPromo() {

  const dispatch = useDispatch();

  function closeAllModal() {
    dispatch(closeModalPromo());
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => dispatch(closeAllModal)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.heading}>Бесплатные тарифы</p>
            <p>3 месяца</p>
          </div>
          <div className={styles.modalContent}>
            <p>В честь открытия сайта «iristrans.com» все тарифы бесплатны в течение 3 месяцев.</p>
            <button type="submit" className={styles.button_long} onClick={() => dispatch(closeAllModal)}>Закрыть</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalPromo