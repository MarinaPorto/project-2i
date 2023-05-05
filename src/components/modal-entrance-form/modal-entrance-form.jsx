import styles from './modal-entrance-form.module.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { closeEntranceModal } from '../../redux/reducers/entrance-reducer';
import { openRegistrForm } from '../../redux/reducers/registration-reducer';
import { openPasswordModal } from '../../redux/reducers/password-reducer';

const initialValues = {
  email: "",
  password: "",
  remember: true
}
const onSubmit = values => {
  // console.log('form data', values)
}

const validate = values => {
  let errors = {}
  if (!values.email) {
    errors.email = "Заполните поле"
  }
  if (!values.password) {
    errors.password = "Заполните поле"
  }
  return errors
}

export function ModalEntranceForm() {

  const dispatch = useDispatch();

  function changeRegistrationOpen() {
    dispatch(openRegistrForm());
    dispatch(closeEntranceModal());
  }

  function openPasswordModalWindow() {
    dispatch(openPasswordModal());
    dispatch(closeEntranceModal());
  }

  function closeAllModal() {
    dispatch(closeEntranceModal());
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <>
      <div className={styles.darkBG} onClick={() => dispatch(closeAllModal)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.heading}>Вход</p>
          </div>
          <div className={styles.modalContent}>
            <form onSubmit={formik.handleSubmit}>
              <div className={styles.input_box}>
                <label className={styles.input_label} htmlFor="email">Email</label>
                <input className={styles.input} type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.name} placeholder="Введите" />

                {/* {formik.errors.email ? <div>{formik.errors.email}</div> : ""} */}

              </div>
              <div className={styles.input_box}>
                <label className={styles.input_label} htmlFor="password">Пароль</label>
                <input className={styles.input} type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Введите" />

                {/* {formik.errors.password ? <div>{formik.errors.password}</div> : ""} */}
              </div>
              <div className={styles.input_box}>

                <input className={styles.check} type="checkbox" id="remember" name="remember" onChange={formik.handleChange} value={formik.values.remember} />
                <label className={styles.check_label} htmlFor="remember">Запомнить меня</label>
              </div>
              <NavLink to="/main-registered" onClick={() => dispatch(closeAllModal)}>
                <button type="submit" className={styles.button_long}>Войти</button>
              </NavLink>
            </form>
          </div>
          <div className={styles.actionsContainer}>
            <button type="submit" className={styles.button_add} onClick={openPasswordModalWindow}>Забыли пароль?</button>
            <button type="submit" className={styles.button_add} onClick={changeRegistrationOpen}>Регистрация</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalEntranceForm;