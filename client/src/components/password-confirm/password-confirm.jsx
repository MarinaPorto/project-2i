import { useState } from 'react';
import styles from './password-confirm.module.css';
// import styles from './password-confirm-pers.module.css';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { closePasswordModal } from '../../redux/reducers/password-reducer';
import { saveNewPassword } from '../../http/userAPI'
import { useParams } from 'react-router-dom';
import { openEntranceModal } from '../../redux/reducers/entrance-reducer';
import { useNavigate } from 'react-router-dom';

export function PasswordConfirm() {
  const [responseStatus, setResponseStatus] = useState(null)
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    password2: "",
    passwordLink: params.id
  }

  const onSubmit = async (values) => {
    try {
      const response = await saveNewPassword(values)
      setResponseStatus(response.status)
    }
    catch (e) {
      setResponseStatus(e.response.status)
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }

  const validate = values => {
    let errors = {}
    if (!values.password) {
      errors.password = "Заполните поле"
    }
    if (!values.password2) {
      errors.password2 = "Заполните поле"
    } else if (values.password !== values.password2) {
      errors.password2 = "Пароли не совпадают"
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
  function openEmailModal() {
    navigate("/");
    dispatch(openEntranceModal())
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => dispatch(closeAllModal)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            {responseStatus === 200 ? <p className={styles.heading}>Пароль изменен</p> : <p className={styles.heading}>Введите новый пароль</p>}
          </div>
          <div className={styles.modalContent}>
            {responseStatus === 200 ?
              <button type="text" className={styles.button_long} onClick={() => dispatch(openEmailModal)}>Войти</button>
              :
              <>
                {(responseStatus !== 200 && responseStatus !== null) && <div className={styles.error_message}>Ошибка</div>}
                <form onSubmit={formik.handleSubmit}>
                  <div className={styles.input_box}>
                    <label className={styles.input_label} htmlFor="password">Пароль*</label>
                    <input className={styles.input} type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Введите" />
                    {formik.errors.password && <div className={styles.error_message}>{formik.errors.password}</div>}
                  </div>
                  <div className={styles.input_box}>
                    <label className={styles.input_label} htmlFor="password2">Повторите пароль*</label>
                    <input className={styles.input} type="password" id="password2" name="password2" onChange={formik.handleChange} value={formik.values.password2} placeholder="Введите" />
                    {formik.errors.password2 && <div className={styles.error_message}>{formik.errors.password2}</div>}
                  </div>
                  <button type="submit" className={styles.button_long} >Отправить</button>
                </form>
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default PasswordConfirm;