import styles from './search-table.module.css';
import arrows from "./images/arrows.svg"
import { useFormik } from 'formik';
import { useState } from 'react';
import { SelectItems } from '../../select-items';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';

let itemList = [
  { value: 'Тип транспорта 1', label: 'Тип транспорта 1' },
  { value: 'Тип транспорта 2', label: 'Тип транспорта 2' },

];

const initialValues = {
  countryfrom: "",
  cityfrom: "",
  countryto: "",
  cityto: "",
  weightfrom: "",
  weightto: "",
  volumefrom: "",
  volumeto: "",
  calendar: "Дата отгрузки",
  long: "",
  widthup: '',
  heightup: "",
  distanceto: "",
  distancefrom: "",


  remember: true
}
const onSubmit = values => {

}

// const validate = values => {
//   let errors = {}
//   if (!values.email) {
//     errors.email = "Заполните поле"
//   }
//   if (!values.password) {
//     errors.password = "Заполните поле"
//   }
//   return errors
// }

export function SearchTable(props) {

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate
  })

  const [startDate, setStartDate] = useState("");
  return (
    <div className={styles.home_wrapper}>

      <section className={styles.block}>
        <div className={styles.block__header}>
          <div className={styles.header__title}>
            {props.title}
          </div>
        </div>
        <div className={styles.block__content}>
          <div className={styles.content__inner}>
            <form onSubmit={formik.handleSubmit}>
              <div className={styles.country_box}>
                <div className={styles.direction_box}>
                  <input className={`${styles.input} ${styles.input__dir}`} type="text" id="countryfrom" name="countryfrom" onChange={formik.handleChange} value={formik.values.countryfrom} placeholder="Страна/Страны откуда" />
                  <input className={styles.input} type="text" id="cityfrom" name="cityfrom" onChange={formik.handleChange} value={formik.values.cityfrom} placeholder="Любой город" />
                </div>
                <img src={arrows} alt="arrows" className={styles.direction_arrows} />
                <div className={styles.direction_box}>
                  <input className={`${styles.input} ${styles.input__dir}`} type="text" id="countryto" name="countryto" onChange={formik.handleChange} value={formik.values.countryto} placeholder="Страна/Страны откуда" />
                  <input className={styles.input} type="text" id="cityto" name="cityto" onChange={formik.handleChange} value={formik.values.cityto} placeholder="Любой город" />
                </div>
              </div>
              <div className={styles.cargo_data}>
                <div className={styles.cargo_wrap}>
                  <div className={`${styles.cargo_box} ${styles.cargo_box_weight}`}>
                    <input className={`${styles.input} ${styles.input__cargo}`} type="text" id="weightfrom" name="weightfrom" onChange={formik.handleChange} value={formik.values.weightfrom} placeholder="Масса от" />
                  </div>
                  <div className={`${styles.cargo_box} ${styles.cargo_box_weight}`}>
                    <input className={`${styles.input} ${styles.input__cargo}`} type="text" id="weightto" name="weightto" onChange={formik.handleChange} value={formik.values.weightto} placeholder="Масса до" />
                  </div>
                </div>
                <div className={styles.cargo_wrap}>
                  <div className={`${styles.cargo_box} ${styles.cargo_box_volume}`}>
                    <input className={`${styles.input} ${styles.input__cargo}`} type="text" id="volumefrom" name="volumefrom" onChange={formik.handleChange} value={formik.values.volumefrom} placeholder="Объём от" />
                  </div>
                  <div className={`${styles.cargo_box} ${styles.cargo_box_volume}`}>
                    <input className={`${styles.input} ${styles.input__cargo}`} type="text" id="volumeto" name="volumeto" onChange={formik.handleChange} value={formik.values.volumeto} placeholder="Объём до" />
                  </div>
                </div>
              </div>
              <div className={styles.date_wrap}>
                <DatePicker className={`${styles.input}  ${styles.input__calendar}`} locale={ru} selected={startDate} onChange={(date) => setStartDate(date)} placeholderText={'Дата отгрузки'} id="calendar" name="calendar" />
                <SelectItems itemList={itemList}
                  placehold="Тип транспорта" />
              </div>
              <div className={styles.add__info_box}>
                <div className={styles.add__wrap}>
                  <div className={`${styles.add__description} ${styles.add__dimensions}`}>
                    <div className={styles.description__header}>
                      Габариты до
                    </div>
                    <div className={`${styles.description__content} ${styles.dimensions__content}`}>
                      <div className={`${styles.cargo_box} ${styles.dimensions_box}`}>
                        <input className={`${styles.input} ${styles.input__cargo} ${styles.input__dimensions}`} type="text" id="long" name="long" onChange={formik.handleChange} value={formik.values.long} placeholder="Длина до" />
                      </div>
                      <div className={`${styles.cargo_box} ${styles.dimensions_box}`}>
                        <input className={`${styles.input} ${styles.input__cargo} ${styles.input__dimensions}`} type="text" id="widthup" name="widthup" onChange={formik.handleChange} value={formik.values.widthup} placeholder="Ширина до" />
                      </div>
                      <div className={`${styles.cargo_box} ${styles.dimensions_box}`}>
                        <input className={`${styles.input} ${styles.input__cargo} ${styles.input__dimensions}`} type="text" id="heightup" name="heightup" onChange={formik.handleChange} value={formik.values.heightup} placeholder="Высота до" />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.add__description} ${styles.add__distance}`}>
                    <div className={styles.description__header}>
                      Расстояние
                    </div>
                    <div className={`${styles.description__content} ${styles.distance__content}`}>
                      <div className={`${styles.cargo_box} ${styles.distance_box}`}>
                        <input className={`${styles.input} ${styles.input__cargo} ${styles.input__distance}`} type="text" id="distancefrom" name="distancefrom" onChange={formik.handleChange} value={formik.values.distancefrom} placeholder="от" />
                      </div>
                      <div className={`${styles.cargo_box} ${styles.distance_box}`}>
                        <input className={`${styles.input} ${styles.input__cargo} ${styles.input__distance}`} type="text" id="distanceto" name="distanceto" onChange={formik.handleChange} value={formik.values.distanceto} placeholder="до" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.add__wrap}>
                  <div className={styles.add__info_wrap}>
                    <div className={styles.add__info1}>
                      <SelectItems itemList={itemList}
                        placehold="Документы" />
                      <SelectItems itemList={itemList}
                        placehold="Опасность груза" />
                    </div>
                    <div className={styles.add__info2}>
                      <SelectItems itemList={itemList}
                        placehold="Тип погрузки" />
                      <SelectItems itemList={itemList}
                        placehold="Оплата" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.btn__box}>
                <button type="submit" className={`${styles.btn}`}>
                  Найти
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div >
  )
}
export default SearchTable;