import styles from './modal-registr.module.css';
// import styles from './modal-registr-pers.module.css';
import ReactDOM from 'react-dom';
import Button from '../button/button';
import { ReactComponent as Person } from "./images/registr/01.svg";
import { ReactComponent as Organization } from "./images/registr/02.svg";
import { ReactComponent as Individual } from "./images/registr/03.svg";
import { ReactComponent as Carrier } from "./images/work/auto.svg";
import { ReactComponent as Shipper } from "./images/work/box.svg";
import { ReactComponent as Forwarder } from "./images/work/truck.svg";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeRegistrForm } from '../../redux/reducers/registration-reducer';
import { openRegistrForm2 } from '../../redux/reducers/registration-stage2-reducer';
import { setUserRole, setUserWork } from '../../redux/reducers/user-role-reducer';

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
                <div className={regType === "person" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Person className={styles.item__logo}></Person>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="person" name="registration-type" />
                  <label htmlFor="person" className={styles.regisr_type__label} onClick={() => { dispatch(setUserRole('Физическое лицо')); setRegType('person') }}>Физическое лицо</label>
                </div>
                <div className={regType === "organization" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Organization className={styles.item__logo}></Organization>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="organization" name="registration-type" />
                  <label htmlFor="organization" className={styles.regisr_type__label} onClick={() => { dispatch(setUserRole('Юридическое лицо')); setRegType('organization') }}>Юридическое лицо</label>
                </div>
                <div className={regType === "individual" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Individual className={styles.item__logo}></Individual>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="individual" name="registration-type" />
                  <label htmlFor="individual" className={styles.regisr_type__label} onClick={() => { dispatch(setUserRole('Предприниматель')); setRegType('individual') }}>Предприниматель</label>
                </div>
              </div> <p>Вид деятельности</p>
              <div className={styles.registration__items}>
                <div className={workType === "carrier" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Carrier className={styles.item__logo}></Carrier>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="carrier" name="working-type" />
                  <label htmlFor="carrier" className={styles.regisr_type__label} onClick={() => { dispatch(setUserWork('Перевозчик')); setworkType('carrier') }}>Перевозчик</label>
                </div>
                <div className={workType === "shipper" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Shipper className={styles.item__logo}></Shipper>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="shipper" name="working-type" />
                  <label htmlFor="shipper" className={styles.regisr_type__label} onClick={() => { dispatch(setUserWork('Грузоотправитель')); setworkType('shipper') }}>Грузоотправитель</label>
                </div>
                <div className={workType === "forwarder" ? `${styles.registration__item} ${styles.active}` : `${styles.registration__item}`}>
                  <Forwarder className={`${styles.item__logo} ${styles.item__logo_forwarder}`}></Forwarder>
                  <input type="radio" className={styles.regisr_type__radio}
                    id="forwarder" name="working-type" />
                  <label htmlFor="forwarder" className={styles.regisr_type__label} onClick={() => { dispatch(setUserWork('Экспедитор')); setworkType('forwarder') }}>Экспедитор</label>
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