import styles from './registration-fl.module.css';
// import styles from './registration-fl-pers.module.css';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeRegistrForm2 } from '../../redux/reducers/registration-stage2-reducer';
import { openRegFinishModal } from '../../redux/reducers/registration-finish';
import { registration } from '../../http/userAPI';
import { saveUserData } from '../../redux/reducers/user-data-reducer';

// /^[^@\s]+@[^@\s]+\.[^@\s\.]{2,}$/;

export function RegistrationFl() {

  const userRole = useSelector(state => state.userRole.userRole);
  const userWork = useSelector(state => state.userRole.userWork);
  const [datapolicy, setDatapolicy] = useState(false);

  const initialValues = {
    role: userRole,
    work: userWork,
    orgname: "",
    surname: "",
    name: "",
    secondname: "",
    country: "",
    city: "",
    unp: "",
    number: "",
    email: "",
    password: "",
    password2: "",
    // verification: "",
    datapolicy: datapolicy,
  }
  const dispatch = useDispatch();

  function openModalRegFinish() {
    dispatch(openRegFinishModal());
    dispatch(closeRegistrForm2());
  }

  const [file, setFile] = useState(null);
  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const validate = values => {
    let errors = {}
    if (userRole === "Юридическое лицо") {
      if (!values.orgname) {
        errors.orgname = "Заполните поле"
      }
      if (!values.name) {
        errors.name = "Заполните поле"
      } else if (!/^[a-zA-Zа-яА-яЁё]+$/i.test(values.name)) {
        errors.name = "Разрешены только буквы"
      }

      if (!values.country) {
        errors.country = "Заполните поле"
      }
      if (!values.city) {
        errors.city = "Заполните поле"
      }
      if (!values.unp) {
        errors.unp = "Заполните поле"
      }
      if (!values.number) {
        errors.number = "Заполните поле"
      }
      if (!values.email) {
        errors.email = "Заполните поле"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {

        errors.email = "Проверьте email"
      }
      if (!values.password) {
        errors.password = "Заполните поле"
      }
      if (!values.password2) {
        errors.password2 = "Заполните поле"
      } else if (values.password !== values.password2) {
        errors.password2 = "пароли не совпадают"
      }
      if (!datapolicy) {

        errors.datapolicy = "Заполните поле"
      }
      if (file === null) {
        errors.verification = "Прикрепите документ"
      }
    } else {
      if (!values.name) {
        errors.name = "Заполните поле"
      } else if (!/^[a-zA-Zа-яА-яЁё]+$/i.test(values.name)) {
        errors.name = "Разрешены только буквы"
      }
      if (!values.surname) {
        errors.surname = "Заполните поле"
      } else if (!/^[a-zA-Zа-яА-яЁё]+$/i.test(values.surname)) {
        errors.surname = "Разрешены только буквы"
      }
      if (!values.country) {
        errors.country = "Заполните поле"
      }
      if (!values.city) {
        errors.city = "Заполните поле"
      }
      if (!values.number) {
        errors.number = "Заполните поле"
      }
      if (!values.email) {
        errors.email = "Заполните поле"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Проверьте email"
      }
      if (!values.password) {
        errors.password = "Заполните поле"
      }
      if (!values.password2) {
        errors.password2 = "Заполните поле"
      } else if (values.password !== values.password2) {
        errors.password2 = "пароли не совпадают"
      }
      if (!datapolicy) {
        errors.datapolicy = "Заполните поле"
      }
      if (file === null) {
        errors.verification = "Прикрепите документ"
      }
    }
    return errors
  }


  const formData = new FormData();
  const onSubmit = async (values) => {
    formData.append('verification', file)
    formData.append('role', userRole)
    formData.append('work', userWork)
    formData.append('surname', values.surname)
    formData.append('name', values.name)
    formData.append('secondname', values.secondname)
    formData.append('country', values.country)
    formData.append('city', values.city)
    formData.append('unp', values.unp)
    formData.append('number', values.number)
    formData.append('email', values.email)
    formData.append('password', values.password)
    formData.append('datapolicy', datapolicy)
    formData.append('orgname', values.orgname)
    const response = await registration(formData);
    localStorage.setItem('token', response.data.accessToken);
    dispatch(saveUserData(response.data));
    openModalRegFinish();
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
    validate,
  })

  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.input_wrapper}>
          {userRole === "Юридическое лицо" ?
            <div className={styles.input_box}>
              <label className={styles.input_label} htmlFor="orgname">Название юридического лица*</label>
              <input className={styles.input} type="text" id="orgname" name="orgname" onChange={formik.handleChange} value={formik.values.orgname} placeholder="Введите" />
              {formik.errors.orgname && <div className={styles.error_message}>{formik.errors.orgname}</div>}
            </div>
            : <div className={styles.input_box_fl}>
              <div className={styles.input_box}>
                <label className={styles.input_label} htmlFor="surname">Фамилия*</label>
                <input className={styles.input} type="text" id="surname" name="surname" onChange={formik.handleChange} value={formik.values.surname} placeholder="Фамилия" />
                {formik.errors.surname && <div className={styles.error_message}>{formik.errors.surname}</div>}
              </div>
              <div className={styles.input_box}>
                <label className={styles.input_label} htmlFor="name">Имя*</label>
                <input className={styles.input} type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Имя" />
                {formik.errors.name && <div className={styles.error_message}>{formik.errors.name}</div>}
              </div>
              <div className={styles.input_box}>
                <label className={styles.input_label} htmlFor="secondname">Отчество/второе имя</label>
                <input className={styles.input} type="text" id="secondname" name="secondname" onChange={formik.handleChange} value={formik.values.secondname} placeholder="Отчество/второе имя" />
              </div>
            </div>}
          <div className={styles.input_box}>
            <label className={styles.input_label} htmlFor="country">{userRole === "Юридическое лицо" ? " Страна регистрации*" : "Страна проживания*"}</label>
            <input className={styles.input} type="text" id="country" name="country" onChange={formik.handleChange} value={formik.values.country} placeholder="Введите" />
            {formik.errors.country && <div className={styles.error_message}>{formik.errors.country}</div>}
          </div>
          <div className={styles.input_box}>
            <label className={styles.input_label} htmlFor="city">{userRole === "Физическое лицо" ? " Город проживания*" : "Город регистрации*"}</label>
            <input className={styles.input} type="text" id="city" name="city" onChange={formik.handleChange} value={formik.values.city} placeholder="Введите" />
            {formik.errors.city && <div className={styles.error_message}>{formik.errors.city}</div>}
          </div>
          {(userRole === "Юридическое лицо" || userRole === "Предприниматель") &&
            <div className={styles.input_box}>
              <label className={styles.input_label} htmlFor="unp">УНП*</label>
              <input className={styles.input} type="text" id="unp" name="unp" onChange={formik.handleChange} value={formik.values.unp} placeholder="Введите" />
              {formik.errors.unp && <div className={styles.error_message}>{formik.errors.unp}</div>}
            </div>
          }
          {userRole === "Юридическое лицо" &&
            <div className={styles.input_box}>
              <label className={styles.input_label} htmlFor="name">Ф.И.О. контактного лица*</label>
              <input className={styles.input} type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Имя" />
              {formik.errors.name && <div className={styles.error_message}>{formik.errors.name}</div>}
            </div>
          }
          <div className={styles.input_box}>
            <input className={styles.input} onChange={formik.handleChange} id="number" name="number" value={formik.values.number} placeholder="Введите номер" >
            </input>
            {/* <InputMask className={styles.input} mask="+375 (99) - 999- 99 -99" placeholder="+375 (__) - ___ - __ - __" onChange={formik.handleChange} id="number" name="number">
            </InputMask> */}
            <label className={styles.input_label} htmlFor="number">Номер телефона*</label>
            {formik.errors.number && <div className={styles.error_message}>{formik.errors.number}</div>}
          </div>
          <div className={styles.input_box}>
            <label className={styles.input_label} htmlFor="email">Email*</label>
            <input className={styles.input} type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Введите" />
            {formik.errors.email && <div className={styles.error_message}>{formik.errors.email}</div>}
          </div>
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
          <div className={styles.input_box}>
            <label className={styles.input_label} htmlFor="verification">Верификация*</label>
            <span className={(file !== null) ? `${styles.input_file_text_hidden}` : `${styles.input_file_text}`} type="text">{(file !== null) ? file.name : (userRole === "Физическое лицо") ? "Прикрепите фото паспорта" : "Прикрепите свидетельство о гос.регистрации"}</span>
            <input className={`${styles.input} ${styles.input_verification}`} type="file" id="verification" name="verification" onChange={selectFile} placeholder={userRole === "Физическое лицо" ? "Прикрепите фото паспорта" : "Прикрепите свидетельство о гос.регистрации"} />
            {formik.errors.verification && <div className={styles.error_message}>{formik.errors.verification}</div>}
          </div>
          <p className={styles.form_text}>*поле обязательно к заполнению</p>
          <div className={styles.input_box}>
            <input className={styles.check} type="checkbox" id="datapolicy" name="datapolicy" onChange={() => setDatapolicy(!datapolicy)} />
            <label className={styles.check_label} htmlFor="datapolicy">Я ознакомлен и согласен с политикой обработки и хранения персональных данных</label>
            {formik.errors.datapolicy && <div className={styles.error_message_check}>{formik.errors.datapolicy}</div>}
          </div>
          <button type="submit" className={styles.button_long} >Зарегистрироваться</button>
        </div>
      </form>
    </div>
  )
}
export default RegistrationFl;