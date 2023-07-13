import styles from './footer-menu.module.css';
// import styles from './footer-menu-pers.module.css';
import Button from '../button/button';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ModalRegistr } from '../modal-registr';
import { openRegistrForm } from '../../redux/reducers/registration-reducer';


export function FooterMenu() {
  const registrationOpen = useSelector(state => state.registration.registrationOpen);
  const dispatch = useDispatch();

  function changeRegistrationOpen() {
    dispatch(openRegistrForm());
  }
  return (
    <div className={styles.contacts_wrapper}>
      <div className="inner">
        <h2 className={styles.title}>IrisTrans.com</h2>
        <div className={styles.contacts_items}>
          <div className={styles.contacts_item}>
            <p className={styles.item_subtitle}>Международный поиск груза и транспорта</p>
            <Button click={changeRegistrationOpen}>Регистрация</Button>
            {registrationOpen && <ModalRegistr />}
            <p className={styles.info}>Юр. информация: ООО «ИрИс Интер ГРУПП», УНП: 193438125, <br />
              Адрес: Республика Беларусь, г. Минск, ул. Краснозвёздная,<br /> д. 18б, офис 701</p>
          </div>
          <div className={styles.contacts_item}>
            <h4 className={styles.item_title}>Решения</h4>
            <ul className={styles.contacts_list}>
              <NavLink to='/perevozchiku' key='/perevozchiku'>
                <li className={styles.nav__item}>Перевозчику</li>
              </NavLink>
              <NavLink to='/gruzootpravitelyu' key='/gruzootpravitelyu' >
                <li className={styles.nav__item}>Грузоотправителю</li>
              </NavLink>
              <NavLink to='/ekspeditoru' key='ekspeditoru'  >
                <li className={styles.nav__item}>Экспедитору</li>
              </NavLink>
            </ul>
          </div>
          <div className={styles.contacts_item}>
            <h4 className={styles.item_title}>Информация</h4>
            <ul className={styles.contacts_list}>
              <NavLink to='/tariff' key='tariff'  >
                <li className={styles.nav__item}>Тарифы</li>
              </NavLink>
              <NavLink to='/oplata' key='oplata'  >
                <li className={styles.nav__item}>Оплата</li>
              </NavLink>
              <NavLink to='/faq' key='faq'  >
                <li className={styles.nav__item}>FAQ</li>
              </NavLink>
              <NavLink to='/pravila' key='pravila'  >
                <li className={styles.nav__item}>Правила</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FooterMenu;