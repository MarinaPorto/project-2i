import styles from './modal-registr-form.module.css';
import Button from '../button/button';
import { NavLink } from 'react-router-dom';

import { useState } from 'react';

export function ModalRegistrForm({ setIsOpen }) {

  const [regType, setRegType] = useState("");
  const [workType, setworkType] = useState("");

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.heading}>Расскажите о себе</p>
          </div>
          <div className={styles.modalContent}>
        
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <Button >Далее</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalRegistrForm;