import styles from './search-table.module.css';
import stylesSelect from '../../select-items/select-items.module.css';
import arrows from "./images/arrows.svg"
import arrow from "./images/arrow.svg"
import Select, { components } from 'react-select';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { docsItems, transportItems, loadingItems, cargoDangerItems, paymentItems } from './options-items';
import { cargoFind } from '../../../http/cargoApi';
import { saveFoundCargo } from '../../../redux/reducers/cargo-search-reducer';
import { countriesList } from '../../../services/countries-list';

export function SearchTable(props) {

  const dispatch = useDispatch();
  const [selectedOptionsDocs, setSelectedOptionsDocs] = useState("");
  const [selectedOptionsTransport, setSelectedOptionTransport] = useState("");
  const [selectedOptionsLoading, setSelectedOptionLoading] = useState("");
  const [selectedOptionsDanger, setselectedOptionsDanger] = useState("");
  const [selectedOptionsPayment, setSelectedOptionPayment] = useState("");
  const [selectedOptionsCountry, setselectedOptionsCountry] = useState();
  const [selectedOptionsCountryTo, setselectedOptionsCountryTo] = useState();

  function handleDocsSelect(data) {
    setSelectedOptionsDocs(data);
  }

  function handleTransportSelect(data) {
    setSelectedOptionTransport(data);
  }
  function handleLoadingSelect(data) {
    setSelectedOptionLoading(data);
  }
  function handleDangerSelect(data) {
    setselectedOptionsDanger(data);
  }
  function handlePaymentSelect(data) {
    setSelectedOptionPayment(data);
  }
  function handleCountrySelect(data) {
    setselectedOptionsCountry(data);
  }
  function handleCountryToSelect(data) {
    setselectedOptionsCountryTo(data);
  }

  function dataArray(arr) {
    let dataFromQuery = [];
    if (arr.length > 0) {
      arr.forEach(element => {
        dataFromQuery.push(element.id)
      });
      return dataFromQuery
    }
    dataFromQuery = ""
    return dataFromQuery
  }

  const [startDate, setStartDate] = useState("");
  const initialValues = {
    cityfrom: "",
    cityto: "",
    weightMin: "",
    weighMax: "",
    volumeMin: "",
    volumeMax: "",
    calendar: startDate,
    long: "",
    widthMax: "",
    heightMax: "",
    distanceto: "",
    distancefrom: "",
  }

  const validate = (values) => {
    let errors = {}
    if (!values.cityfrom) {
      errors.cityfrom = "Заполните поле"
    }
    if (!values.cityto) {
      errors.cityto = "Заполните поле"
    }
    return errors
  }

  const onSubmit = async (values) => {
    let fullValues = {
      ...values,
      countryfrom: selectedOptionsCountry.value,
      countryto: selectedOptionsCountry.value,
      calendar: startDate,
      docs: dataArray(selectedOptionsDocs),
      transport: dataArray(selectedOptionsTransport),
      loading: dataArray(selectedOptionsLoading),
      payment: dataArray(selectedOptionsPayment),
      danger: selectedOptionsDanger ? selectedOptionsDanger.value : ""
    }
    const response = await cargoFind(fullValues);
    dispatch(saveFoundCargo(response.data))
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  const colourStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: '#00354b',
      }
    }
  }

  const DropdownIndicator = (
    props
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={arrow} alt="arrow" />
      </components.DropdownIndicator>
    );
  };

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
                  <Select
                    styles={colourStyles}
                    components={{ DropdownIndicator }}
                    options={countriesList}
                    placeholder="Страна откуда"
                    value={selectedOptionsCountry}
                    onChange={handleCountrySelect}
                  />
                  {/* <input className={`${styles.input} ${styles.input__dir}`} type="text" id="countryfrom" name="countryfrom" onChange={formik.handleChange} value={formik.values.countryfrom} placeholder="Страна/Страны откуда" />
                  {formik.errors.countryfrom && <div className={styles.error_message}>{formik.errors.countryfrom}</div>} */}
                  <input className={`${styles.input}  ${styles.input__region}`} type="text" id="cityfrom" name="cityfrom" onChange={formik.handleChange} value={formik.values.cityfrom} placeholder="Любой город" />
                  {formik.errors.cityfrom && <div className={styles.error_message}>{formik.errors.cityfrom}</div>}
                </div>
                <img src={arrows} alt="arrows" className={styles.direction_arrows} />
                <div className={styles.direction_box}>
                  <Select
                    styles={colourStyles}
                    components={{ DropdownIndicator }}
                    options={countriesList}
                    placeholder="Страна куда"
                    value={selectedOptionsCountryTo}
                    onChange={handleCountryToSelect}
                  />
                  {/* <input className={`${styles.input} ${styles.input__dir}`} type="text" id="countryto" name="countryto" onChange={formik.handleChange} value={formik.values.countryto} placeholder="Страна/Страны откуда" />
                  {formik.errors.countryto && <div className={styles.error_message}>{formik.errors.countryto}</div>} */}
                  <input className={`${styles.input}  ${styles.input__region}`} type="text" id="cityto" name="cityto" onChange={formik.handleChange} value={formik.values.cityto} placeholder="Любой город" />
                  {formik.errors.cityto && <div className={styles.error_message}>{formik.errors.cityto}</div>}
                </div>
              </div>
              <div className={styles.cargo_data}>
                <div className={styles.cargo_wrap}>
                  <div className={`${styles.cargo_box} ${styles.cargo_box_weight}`}>
                    <input className={`${styles.input} ${styles.input__cargo}`} type="text" id="weightMin" name="weightMin" onChange={formik.handleChange} value={formik.values.weightMin} placeholder="Масса от" />
                  </div>
                  <div className={`${styles.cargo_box} ${styles.cargo_box_weight}`}>
                    <input className={`${styles.input} ${styles.input__cargo}`} type="text" id="weighMax" name="weighMax" onChange={formik.handleChange} value={formik.values.weighMax} placeholder="Масса до" />
                  </div>
                </div>
                <div className={styles.cargo_wrap}>
                  <div className={`${styles.cargo_box} ${styles.cargo_box_volume}`}>
                    <input className={`${styles.input} ${styles.input__cargo}`} type="text" id="volumeMin" name="volumeMin" onChange={formik.handleChange} value={formik.values.volumeMin} placeholder="Объём от" />
                  </div>
                  <div className={`${styles.cargo_box} ${styles.cargo_box_volume}`}>
                    <input className={`${styles.input} ${styles.input__cargo}`} type="text" id="volumeMax" name="volumeMax" onChange={formik.handleChange} value={formik.values.volumeMax} placeholder="Объём до" />
                  </div>
                </div>
              </div>
              <div className={styles.date_wrap}>
                <DatePicker className={`${styles.input}  ${styles.input__calendar}`} locale={ru} selected={startDate} onChange={(date) => setStartDate(date)} placeholderText={'Дата отгрузки'} id="calendar" name="calendar" />
                <div className={`${stylesSelect.select_custom}`}>
                  <Select
                    styles={colourStyles}
                    components={{ DropdownIndicator }}
                    options={transportItems}
                    placeholder="Тип транспорта"
                    value={selectedOptionsTransport}
                    onChange={handleTransportSelect}
                    isMulti
                  />
                </div>
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
                        <input className={`${styles.input} ${styles.input__cargo} ${styles.input__dimensions}`} type="text" id="widthMax" name="widthMax" onChange={formik.handleChange} value={formik.values.widthMax} placeholder="Ширина до" />
                      </div>
                      <div className={`${styles.cargo_box} ${styles.dimensions_box}`}>
                        <input className={`${styles.input} ${styles.input__cargo} ${styles.input__dimensions}`} type="text" id="heightMax" name="heightMax" onChange={formik.handleChange} value={formik.values.heightMax} placeholder="Высота до" />
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
                      <div className={`${stylesSelect.select_custom}`}>
                        <Select
                          styles={colourStyles}
                          components={{ DropdownIndicator }}
                          options={docsItems}
                          placeholder="Документы"
                          value={selectedOptionsDocs}
                          onChange={handleDocsSelect}
                          isMulti
                        />
                      </div>
                      <div className={`${stylesSelect.select_custom}`}>
                        <Select
                          styles={colourStyles}
                          components={{ DropdownIndicator }}
                          options={cargoDangerItems}
                          placeholder="Опасность груза"
                          value={selectedOptionsDanger}
                          onChange={handleDangerSelect}
                        />
                      </div>
                    </div>
                    <div className={styles.add__info2}>
                      <div className={`${stylesSelect.select_custom}`}>
                        <Select
                          styles={colourStyles}
                          components={{ DropdownIndicator }}
                          options={loadingItems}
                          placeholder="Тип погрузки"
                          value={selectedOptionsLoading}
                          onChange={handleLoadingSelect}
                          isMulti
                        />
                      </div>
                      <div className={`${stylesSelect.select_custom}`}>
                        <Select
                          styles={colourStyles}
                          components={{ DropdownIndicator }}
                          options={paymentItems}
                          placeholder="Оплата"
                          value={selectedOptionsPayment}
                          onChange={handlePaymentSelect}
                          isMulti
                        />
                      </div>
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
        </div >
      </section >
    </div >
  )
}
export default SearchTable;