import styles from './update-user-data-form.module.css';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData } from '../../../redux/reducers/user-data-reducer';
import { toggleEditForm } from '../../../redux/reducers/edit-form-reducer';
import { updateUserData } from '../../../http/userAPI';

// /^[^@\s]+@[^@\s]+\.[^@\s\.]{2,}$/;

export function UserUpdate() {

  const userData = useSelector(state => state.userData.userData);
  const userRole = useSelector(state => state.userRole.userRole);
  const initialValues = {
    orgname: userData.orgname,
    surname: userData.surname,
    name: userData.name,
    country: userData.country,
    city: userData.city,
    unp: userData.unp,
    number: userData.number,
    userId: userData.id
  }
  const validate = values => {
    let errors = {}
    if (userRole === "Юридическое лицо") {

      if (!values.orgname) {
        errors.orgname = "Заполните поле"
      }
      if (!values.name) {
        errors.name = "Заполните поле"
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
    } else {

      if (!values.name) {
        errors.name = "Заполните поле"
      }
      if (!values.surname) {
        errors.surname = "Заполните поле"
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
    }
    return errors
  }


  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    let newData = await updateUserData(values)
    dispatch(saveUserData(newData.data));
    dispatch(toggleEditForm());
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.input_wrapper}>
          {userData.role === "Юридическое лицо" ?
            <div className={styles.input_box}>
              <label className={styles.input_label} htmlFor="orgname">Название юридического лица*</label>
              <input className={styles.input} type="text" id="orgname" name="orgname" onChange={formik.handleChange} value={userData.orgname} placeholder="Введите" />
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
          {(userData.role === "Юридическое лицо" || userRole === "Предприниматель") &&
            <div className={styles.input_box}>
              <label className={styles.input_label} htmlFor="unp">УНП*</label>
              <input className={styles.input} type="text" id="unp" name="unp" onChange={formik.handleChange} value={formik.values.unp} placeholder="Введите" />
              {formik.errors.unp && <div className={styles.error_message}>{formik.errors.unp}</div>}
            </div>
          }
          {userData.role === "Юридическое лицо" &&
            <div className={styles.input_box}>
              <label className={styles.input_label} htmlFor="name">Ф.И.О. контактного лица*</label>
              <input className={styles.input} type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Имя" />
              {formik.errors.name && <div className={styles.error_message}>{formik.errors.name}</div>}
            </div>
          }
          <div className={styles.input_box}>
            <InputMask value={formik.values.number} className={styles.input} mask="+375 (99) - 999- 99 -99" placeholder="+375 (__) - ___ - __ - __" onChange={formik.handleChange} id="number" name="number">
            </InputMask>
            <label className={styles.input_label} htmlFor="number">Номер телефона*</label>
            {formik.errors.number && <div className={styles.error_message}>{formik.errors.number}</div>}
          </div>
          <button type="submit" className={styles.button_long} >Сохранить</button>
        </div>
      </form>
    </div>

  )
}
export default UserUpdate;