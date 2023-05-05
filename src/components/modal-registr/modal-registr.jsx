import styles from './modal-registr.module.css';
import ReactDOM from 'react-dom';
import Button from '../button/button';
import { ReactComponent as Individual } from "./images/registr/01.svg";
import { ReactComponent as Entity } from "./images/registr/02.svg";
import { ReactComponent as Entrepreneur } from "./images/registr/03.svg";
import { ReactComponent as Carrier } from "./images/work/auto.svg";
import { ReactComponent as Shipper } from "./images/work/box.svg";
import { ReactComponent as Forwarder } from "./images/work/truck.svg";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeRegistrForm } from '../../redux/reducers/registration-reducer';
import { openRegistrForm2 } from '../../redux/reducers/registration-stage2-reducer';


export function ModalRegistr() {
  const dispatch = useDispatch();


  const registrationFormOpen = useSelector(state => state.registrationForm.registrationForm);

  function changeRegistrationFormOpen() {
    dispatch(closeRegistrForm());
    dispatch(openRegistrForm2());


  }
  function closeAllModal() {
    dispatch(closeRegistrForm());
  }


  const [regType, setRegType] = useState("");
  const [workType, setworkType] = useState("");

  const portal = document.getElementById('portal');

  return ReactDOM.createPortal(

    <>
      <div className={styles.darkBG} onClick={() => dispatch(closeAllModal)} />
      {
        (!registrationFormOpen) &&
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <p className={styles.heading}>Расскажите о себе</p>
            </div>
            <div className={styles.modalContent}>
              <p>Тип регистрации</p>
              <div className={styles.registration__items}>
                <div className={regType === "individual" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Individual className={styles.item__logo}></Individual>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="individual" name="registration-type" />
                  <label htmlFor="individual" className={styles.regisr_type__label} onClick={() => setRegType('individual')}>Физическое лицо</label>
                </div>
                <div className={regType === "entity" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Entity className={styles.item__logo}></Entity>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="entity" name="registration-type" />
                  <label htmlFor="entity" className={styles.regisr_type__label} onClick={() => setRegType('entity')}>Юридическое лицо</label>
                </div>
                <div className={regType === "entrepreneur" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Entrepreneur className={styles.item__logo}></Entrepreneur>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="entrepreneur" name="registration-type" />
                  <label htmlFor="entrepreneur" className={styles.regisr_type__label} onClick={() => setRegType('entrepreneur')}>Предприниматель</label>
                </div>
              </div> <p>Вид деятельности</p>
              <div className={styles.registration__items}>
                <div className={workType === "carrier" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Carrier className={styles.item__logo}></Carrier>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="carrier" name="working-type" />
                  <label htmlFor="carrier" className={styles.regisr_type__label} onClick={() => setworkType('carrier')}>Перевозчик</label>
                </div>
                <div className={workType === "shipper" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Shipper className={styles.item__logo}></Shipper>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="shipper" name="working-type" />
                  <label htmlFor="shipper" className={styles.regisr_type__label} onClick={() => setworkType('shipper')}>Грузоотправитель</label>
                </div>
                <div className={workType === "forwarder" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Forwarder className={`${styles.item__logo} ${styles.item__logo_forwarder}`}></Forwarder>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="forwarder" name="working-type" />
                  <label htmlFor="forwarder" className={styles.regisr_type__label} onClick={() => setworkType('forwarder')}>Экспедитор</label>
                </div>
              </div>
            </div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <Button click={changeRegistrationFormOpen}>Далее</Button>
              </div>
            </div>
          </div>

        </div>
      }
    </>,
    portal
  )
}
export default ModalRegistr;