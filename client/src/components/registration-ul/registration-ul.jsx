import styles from './registration-ul.module.css';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';

const initialValues = {
  orgname: "",
  name: "",
  secondname: "",
  country: "",
  city: "",
  unp: "",
  number: "",
  email: "",
  password: "",
  password2: "",
  verification: "",
  datapolicy: false,
}
const onSubmit = values => {

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

export function RegistrationUl() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.input_box}>
          <label className={styles.input_label} htmlFor="orgname">Название юридического лица*</label>
          <input className={styles.input} type="text" id="orgname" name="orgname" onChange={formik.handleChange} value={formik.values.orgname} placeholder="Введите" />
        </div>
        <div className={styles.input_box}>
          <label className={styles.input_label} htmlFor="country">Страна регистрации*</label>
          <input className={styles.input} type="text" id="country" name="country" onChange={formik.handleChange} value={formik.values.country} placeholder="Введите" />
        </div>
        <div className={styles.input_box}>
          <label className={styles.input_label} htmlFor="city">Город регистрации*</label>
          <input className={styles.input} type="text" id="city" name="city" onChange={formik.handleChange} value={formik.values.city} placeholder="Введите" />
        </div>
        <div className={styles.input_box}>
          <label className={styles.input_label} htmlFor="unp">УНП*</label>
          <input className={styles.input} type="text" id="unp" name="unp" onChange={formik.handleChange} value={formik.values.city} placeholder="Введите" />
        </div>
        <div className={styles.input_box}>
          <label className={styles.input_label} htmlFor="name">Ф.И.О. контактного лица*</label>
          <input className={styles.input} type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Имя" />
        </div>
        <div className={styles.input_box}>
          <InputMask className={styles.input} mask="+375 (99) - 999- 99 -99" placeholder="+375 (__) - ___ - __ - __" onChange={formik.handleChange} id="number" name="number">
          </InputMask>
          <label className={styles.input_label} htmlFor="number">Номер телефона*</label>
        </div>
        <div className={styles.input_box}>
          <label className={styles.input_label} htmlFor="email">Email*</label>
          <input className={styles.input} type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Введите" />
        </div>
        <div className={styles.input_box}>
          <label className={styles.input_label} htmlFor="password">Пароль*</label>
          <input className={styles.input} type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Введите" />
        </div>
        <div className={styles.input_box}>
          <label className={styles.input_label} htmlFor="password2">Повторите пароль*</label>
          <input className={styles.input} type="password" id="password2" name="password2" onChange={formik.handleChange} value={formik.values.password2} placeholder="Введите" />
        </div>
        <div className={styles.input_box}>
          <label className={styles.input_label} htmlFor="verification">Верификация*</label>
          <input className={`${styles.input} ${styles.input_verification}`} type="text" id="verification" name="verification" onChange={formik.handleChange} value={formik.values.verification} placeholder="Прикрепите свидетельство о гос.регистрации" />
        </div>
        <p className={styles.form_text}>*поле не обязательно к заполнению</p>
        <div className={styles.input_box}>
          <input className={styles.check} type="checkbox" id="datapolicy" name="datapolicy" onChange={formik.handleChange} value={formik.values.datapolicy} />
          <label className={styles.check_label} htmlFor="datapolicy">Я ознакомлен и согласен с политикой обработки и хранения персональных данных</label>
        </div>
        <button type="submit" className={styles.button_long}>Зарегистрироваться</button>
      </form>
    </div>
  )
}
export default RegistrationUl;