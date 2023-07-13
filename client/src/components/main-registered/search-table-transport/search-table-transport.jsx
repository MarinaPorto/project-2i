import styles from './search-table-transport.module.css';
import stylesSelect from '../../select-items/select-items.module.css';
import arrow from "./images/arrow.svg"
import Select, { components } from 'react-select';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { docsItems, transportItems, loadingItems, cargoDangerItems, paymentItems } from './options-items';
import { transportFind } from '../../../http/transportApi';
import { saveFoundTransport } from '../../../redux/reducers/transport-search-reducer';
import { countriesList } from '../../../services/countries-list';


export function SearchTableTransport(props) {

  const dispatch = useDispatch();
  const [selectedOptionsDocs, setSelectedOptionsDocs] = useState("");
  const [selectedOptionsTransport, setSelectedOptionTransport] = useState("");
  const [selectedOptionsLoading, setSelectedOptionLoading] = useState("");
  const [selectedOptionsDanger, setselectedOptionsDanger] = useState("");
  const [selectedOptionsPayment, setSelectedOptionPayment] = useState("");
  const [selectedOptionsCountry, setselectedOptionsCountry] = useState();

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

  const initialValues = {
    regions: "",
    location: "",
    weighMax: "",
    long: "",
    widthMax: "",
    heightMax: "",
  }

  const validate = (values) => {
    let errors = {}
    if (!values.location) {
      errors.location = "Заполните поле"
    }
    if (!values.regions) {
      errors.regions = "Заполните поле"
    }
    return errors
  }

  const onSubmit = async (values) => {
    let fullValues = {
      ...values,
      countryfrom: selectedOptionsCountry.value,
      docs: dataArray(selectedOptionsDocs),
      transport: dataArray(selectedOptionsTransport),
      loading: dataArray(selectedOptionsLoading),
      payment: dataArray(selectedOptionsPayment),
      danger: selectedOptionsDanger ? selectedOptionsDanger.value : "",
    }
    const response = await transportFind(fullValues);
    dispatch(saveFoundTransport(response.data))
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
                  {/* <input className={`${styles.input} ${styles.input__dir}`} type="text" id="countryfrom" name="countryfrom" onChange={formik.handleChange} value={formik.values.countryfrom} placeholder="Возможные направления перевозки груза" />
                  {formik.errors.countryfrom && <div className={styles.error_message}>{formik.errors.countryfrom}</div>} */}
                  <input className={`${styles.input} ${styles.input__dir} ${styles.input__region}`} type="text" id="regions" name="regions" onChange={formik.handleChange} value={formik.values.regions} placeholder="Регионы работы" />
                  {formik.errors.regions && <div className={styles.error_message}>{formik.errors.regions}</div>}
                </div>
                <div className={styles.direction_box}>
                  <input className={`${styles.input} ${styles.input__dir}`} type="text" id="location" name="location" onChange={formik.handleChange} value={formik.values.location} placeholder="Месторасположение транспорта" />
                  {formik.errors.location && <div className={styles.error_message}>{formik.errors.location}</div>}
                  <div className={styles.cargo_wrap}>
                    <div className={`${styles.cargo_box} ${styles.cargo_box_weight}`}>
                      <input className={`${styles.input} ${styles.input__cargo}`} type="text" id="weighMax" name="weighMax" onChange={formik.handleChange} value={formik.values.weighMax} placeholder="Подъёмная масса до" />
                    </div>
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
                <div className={styles.add__wrap}>
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
export default SearchTableTransport;