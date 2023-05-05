import { NavLink } from 'react-router-dom';
import Button from '../button/button';
import logo from './images/logo.png';
import styles from './header.module.css'
import { ButtonEntrance } from '../button-entrance';
import BoxLanguage from '../box-language/box-language';
import Navigation from '../navigation/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { openBurger, closeBurger } from '../../redux/reducers/burger-reducer';
import { openRegistrForm } from '../../redux/reducers/registration-reducer';
import { ModalRegistr } from '../modal-registr';
import { RegistrationForm } from '../form-registration';
import { ModalRegCompleted } from '../modal-reg-completed';
import { ModalEntranceForm } from '../modal-entrance-form';
import { ModalPasswordRecovery } from '../modal-password-recovery';
import { ModalComfirmEmail } from '../modal-comfirm-email';
import { openEntranceModal } from '../../redux/reducers/entrance-reducer';

export function Header() {
  const dispatch = useDispatch();

  const registrationOpen = useSelector(state => state.registration.registrationOpen);
  const registrationFormOpen = useSelector(state => state.registrationForm.registrationForm);
  const registrationFinish = useSelector(state => state.registrationFinish.registrationFinish);
  const entranceModal = useSelector(state => state.entranceModal.entranceModal);
  const passwordModal = useSelector(state => state.passwordModal.passwordModal);
  const emailModal = useSelector(state => state.emailModal.emailModal);

  function changeBurgerMenu() {
    dispatch(openBurger());
  }

  function changeRegistrationOpen() {
    dispatch(openRegistrForm());
  }

  function openEntranceModalWindow() {
    dispatch(openEntranceModal());
  }


  return (
    <header className={styles.header}>
      <div className={styles.burger__btn} onClick={changeBurgerMenu}>
        <span className={styles.burger__icon}></span>
      </div>
      <NavLink to="/" key='logo' >
        <img src={logo} alt="logo" className={styles.logo} onClick={() => dispatch(closeBurger())} />
      </NavLink>
      <Navigation />
      <BoxLanguage />
      <ButtonEntrance click={openEntranceModalWindow}>Вход</ButtonEntrance>
      <Button click={changeRegistrationOpen}>Регистрация</Button>
      {registrationOpen && <ModalRegistr />}
      {registrationFormOpen && <RegistrationForm />}
      {registrationFinish && <ModalRegCompleted />}
      {entranceModal && <ModalEntranceForm />}
      {passwordModal && <ModalPasswordRecovery />}
      {emailModal && <ModalComfirmEmail />}
    </header>
  )
}

export default Header;