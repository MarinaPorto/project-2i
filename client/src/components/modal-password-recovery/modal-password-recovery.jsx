import styles from './modal-password-recovery.module.css';
// import styles from './modal-password-recovery-pers.module.css';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { closePasswordModal } from '../../redux/reducers/password-reducer';
import { openEmailModal } from '../../redux/reducers/email-reducer ';
import { sendPasswordLink } from '../../http/userAPI'

export function ModalPasswordRecovery() {

  const dispatch = useDispatch();
  const initialValues = {
    email: "",
  }

  const onSubmit = async (values) => {
    try {
      const response = await sendPasswordLink(values)
      dispatch(openEmailModalWindow)
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }

  const validate = values => {
    let errors = {}
    if (!values.email) {
      errors.email = "Заполните поле"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Проверьте email"
    }
    return errors
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

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
                <input className={styles.input} type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Введите" />
                {formik.errors.email ? <div className={styles.error_message}>{formik.errors.email}</div> : ""}
              </div>
              <button type="submit" className={styles.button_long} >Отправить запрос</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalPasswordRecovery;