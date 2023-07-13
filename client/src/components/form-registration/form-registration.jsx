import styles from './form-registration.module.css';
// import styles from './form-registration-pers.module.css';
import { RegistrationFl } from '../registration-fl';
import { useSelector, useDispatch } from 'react-redux';
import { closeRegistrForm2 } from '../../redux/reducers/registration-stage2-reducer';
import { setUserRole, setUserWork } from '../../redux/reducers/user-role-reducer';
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

export function RegistrationForm() {

  const userRole = useSelector(state => state.userRole.userRole);
  const userWork = useSelector(state => state.userRole.userWork);

  const dispatch = useDispatch();

  const [value, setValue] = useState(userRole);
  const [valueActivity, setValueActivity] = useState(userWork);
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
                <div className={styles.select_menu} onClick={() => setIsSelectOpen(!isSelectOpen)} >{value}</div>
                {isSelectOpen && <ul className={styles.select_items_left}>
                  {optionsTypesofRegist.map((option) => (
                    <li className={styles.select_item} value={option.value} onClick={() => { dispatch(setUserRole(option.value)); handleChange(option.value) }}>{option.label}</li>
                  ))}
                </ul>}
              </div>
              <div className="">
                <div className={styles.select_menu} onClick={() => setIsSelectOpenActivity(!isSelectOpenActivity)} >{valueActivity}</div>
                {isSelectOpenActivity && <ul className={styles.select_items_right}>
                  {optionsTypesofActivity.map((option) => (
                    <li className={styles.select_item} value={option.value} onClick={() => { dispatch(setUserWork(option.value)); handleChangeActivity(option.value) }}>{option.label}</li>
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