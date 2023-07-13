import styles from './modal-entrance-form.module.css';
// import styles from './modal-entrance-form-pers.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { closeEntranceModal } from '../../redux/reducers/entrance-reducer';
import { openRegistrForm } from '../../redux/reducers/registration-reducer';
import { loginUserData } from '../../redux/reducers/user-data-reducer';
import { openPasswordModal } from '../../redux/reducers/password-reducer';
import AuthService from '../../services/AuthService';

const initialValues = {
  email: "",
  password: "",
}

const validate = values => {
  let errors = {}
  if (!values.email) {
    errors.email = "Заполните поле"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Проверьте email"
  }
  if (!values.password) {
    errors.password = "Заполните поле"
  }
  return errors
}

export function ModalEntranceForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onSubmit = async (values) => {
    try {
      const response = await AuthService.login(values.email, values.password);
      localStorage.setItem('token', response.data.accessToken);
      dispatch(loginUserData(response.data));
      dispatch(closeAllModal)
      navigate("/profile");
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
    validate,
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
                <input className={styles.input} type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Введите" />
                {formik.errors.email ? <div className={styles.error_message}>{formik.errors.email}</div> : ""}
              </div>
              <div className={styles.input_box}>
                <label className={styles.input_label} htmlFor="password">Пароль</label>
                <input className={styles.input} type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Введите" />
                {formik.errors.password ? <div className={styles.error_message}>{formik.errors.password}</div> : ""}
              </div>
              <div className={styles.input_box}>
                <input className={styles.check} type="checkbox" id="remember" name="remember" onChange={formik.handleChange} value={formik.values.remember} />
                <label className={styles.check_label} htmlFor="remember">Запомнить меня</label>
              </div>
              <button type="submit" className={styles.button_long}>Войти</button>
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