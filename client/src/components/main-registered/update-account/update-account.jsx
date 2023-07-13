import styles from './update-account.module.css';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { closeEditAccountForm } from '../../../redux/reducers/edit-account-reducer';
import { addUserAccount } from '../../../http/userAPI';
import { useState } from 'react'

export function AccountUpdate({ userId, email }) {

  const [responseStatus, setResponseStatus] = useState(null);

  const initialValues = {
    account: 0,
    userId: userId,
    date: new Date().toLocaleString(),
    email: email,
    type: 'refill',
  }

  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    const response = await addUserAccount(values)
    setResponseStatus(response.status);
    setTimeout(() => {
      dispatch(closeEditAccountForm());
    }, 5000);
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  return (
    <div className={styles.form_wrapper}>
      {responseStatus === 200 &&
        <div className={styles.success_message}>Счет пополнен</div>
      }
      {(responseStatus !== 200 && responseStatus !== null) && <div className={styles.unsuccess_message}>Ошибка. Попробуйте позже</div>}
      {responseStatus === null &&
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.input_wrapper}>
            <div className={styles.input_box}>
              <label className={styles.input_label} htmlFor="location">Введите сумму</label>
              <input className={styles.input} type="text" id="account" name="account" onChange={formik.handleChange} value={formik.values.account} placeholder="Введите баллы" />
            </div>
            <button type="submit" className={styles.button_long} >&#10003;</button>
          </div>
        </form>
      }
    </div>
  )
}
export default AccountUpdate;