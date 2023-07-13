import styles from './modal-success.module.css';
import { useDispatch } from 'react-redux';
import { closeSuccessModal } from '../../redux/reducers/success-reducer';

export function ModalSuccess(props) {
  const dispatch = useDispatch();
  function closeAllModal() {
    dispatch(closeSuccessModal());
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => dispatch(closeAllModal)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.heading}>{props.title}</p>
          </div>
          <div className={styles.modalContent}>
            <p>{props.text}</p>
            <button type="submit" className={styles.button_long} onClick={() => dispatch(closeAllModal)}>Закрыть</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalSuccess