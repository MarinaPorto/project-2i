import styles from './form-registration.module.css';
import Select from 'react-select';
import { RegistrationFl } from '../registration-fl';

import { useSelector, useDispatch } from 'react-redux';
import { openRegistrForm,  closeRegistrForm } from '../../redux/reducers/registration-reducer';
import { openRegistrForm2,  closeRegistrForm2 } from '../../redux/reducers/registration-stage2-reducer';

import { useState } from 'react';


const optionsTypesofRegist = [
  { value: 'Физическое лицо', label: 'Физическое лицо' },
  { value: 'Юридическое лицо', label: 'Юридическое лицо' },
  { value: 'Предприниматель', label: 'Предприниматель' },
];
const optionsTypesofActivity = [
  { value: 'Грузоотправитель', label: 'Грузоотправитель' },
  { value: 'Перевозчик', label: 'Перевозчик' },
  { value: 'Экспедитор', label: 'Экспедитор' },
];

export function RegistrationForm({ setIsOpen }) {

  const dispatch = useDispatch();

  const [value, setValue] = useState('Физическое лицо');
  const [valueActivity, setValueActivity] = useState('Грузоотправитель');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSelectOpenActivity, setIsSelectOpenActivity] = useState(false);

  function handleChange(value) {
    setValue(value)
    setIsSelectOpen(false)
  }
  function handleChangeActivity(valueActivity) {
    setValueActivity(valueActivity)
    setIsSelectOpenActivity(false)
  }

  function closeAllModal() {
    // dispatch({type: "CLOSE_REGISTRATION_FORM"});
    // dispatch(closeRegistrForm());
dispatch(closeRegistrForm2());


}

  return (
    <>
      <div className={styles.darkBG} onClick={() => dispatch(closeAllModal)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.heading}>Регистрация</p>
          </div>
          <div className={styles.modalContent}>
            <div className={styles.select_box}>
              <div className="">
                <input type="text" value={value} className={styles.select_menu} onClick={() => setIsSelectOpen(!isSelectOpen)} />
                {isSelectOpen && <ul className={styles.select_items_left}>
                  {optionsTypesofRegist.map((option) => (
                    <li className={styles.select_item} value={option.value} onClick={() => handleChange(option.value)}>{option.label}</li>
                  ))}
                </ul>}
              </div>
              <div className="">
                <input type="text"  value={valueActivity} className={styles.select_menu} onClick={() => setIsSelectOpenActivity(!isSelectOpenActivity)} />
                {isSelectOpenActivity && <ul className={styles.select_items_right}>
                  {optionsTypesofActivity.map((option) => (
                    <li className={styles.select_item} value={option.value} onClick={() => handleChangeActivity(option.value)}>{option.label}</li>
                  ))}
                </ul>} </div>
            </div>

            <RegistrationFl />
          </div>
        </div>
        
      </div>
    </>
  )
}
export default RegistrationForm;