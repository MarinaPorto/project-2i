import styles from './modal-password-recovery.module.css';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { closePasswordModal } from '../../redux/reducers/password-reducer';
import { openEmailModal } from '../../redux/reducers/email-reducer ';

const initialValues = {
  email: "",
}
const onSubmit = values => {
  // console.log('form data', values)
}

const validate = values => {


  let errors = {}
  if (!values.email) {
    errors.email = "Заполните поле"
  }
  return errors
}

export function ModalPasswordRecovery() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  const dispatch = useDispatch();

  function closeAllModal() {
    dispatch(closePasswordModal());
  }

  function openEmailModalWindow() {
    dispatch(closePasswordModal());
    dispatch(openEmailModal());
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => dispatch(closeAllModal)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.heading}>Восстановление пароля</p>
          </div>
          <div className={styles.modalContent}>
            <form onSubmit={formik.handleSubmit}>
              <div className={styles.input_box}>
                <label className={styles.input_label} htmlFor="email">Email</label>
                <input className={styles.input} type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.name} placeholder="Введите" />
                {/* {formik.errors.email ? <div>{formik.errors.email}</div> : ""} */}
              </div>
              <button type="submit" className={styles.button_long} onClick={() => dispatch(openEmailModalWindow)}>Отправить запрос</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalPasswordRecovery;