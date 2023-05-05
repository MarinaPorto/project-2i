import styles from './sidebar-full.module.css';
import arrow from './images/arrow.png';
import user from './images/user.png'
import parcel from './images/parcel.svg'
import truck from './images/truck.svg'
import balance from './images/balance.svg'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openSelectedPage } from '../../../redux/reducers/selected-page-reducer';
import { closeBurger } from '../../../redux/reducers/burger-reducer';

export function SidebarFull() {
  const [isItem1MenuOpen, setIsItem1MenuOpen] = useState(false);
  const [isItem2MenuOpen, setIsItem2MenuOpen] = useState(false);
  const [isItem3MenuOpen, setIsItem3MenuOpen] = useState(false);

  function openMenuUser() {
    setIsItem1MenuOpen(!isItem1MenuOpen);
  }
  function openMenuTransport() {
    setIsItem2MenuOpen(!isItem2MenuOpen);
  }
  function openMenuCargo() {
    setIsItem3MenuOpen(!isItem3MenuOpen);
  }

  const dispatch = useDispatch();

  function goToMyPage() {
    dispatch(openSelectedPage("mypage"))
    dispatch(closeBurger());
  }
  function goToBalancePage() {
    dispatch(openSelectedPage("balancepage"))
    dispatch(closeBurger());
  }
  function goToCargoPage() {
    dispatch(openSelectedPage("cargoSearch"))
    dispatch(closeBurger());
  }
  function goToTransportPage() {
    dispatch(openSelectedPage("transportSearch"))
    dispatch(closeBurger());
  }
  function goToTransportRegistration() {
    dispatch(openSelectedPage("transportRegistration"))
    dispatch(closeBurger());
  }
  function goToCargoRegistration() {
    dispatch(openSelectedPage("cargoRegistration"))
    dispatch(closeBurger());
  }
  function goToservicesPrices() {
    dispatch(openSelectedPage("servicesPrices"))
    dispatch(closeBurger());
  }

  return (

    <div className={styles.wrapper}>
      <div className={styles.items}>
        <div className={styles.item_title} onClick={() => openMenuUser()}>
          <div className={isItem1MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`}>
            <img src={user} alt="icon" />
          </div>
          <div className={`${styles.item_name}`}>
            Иванчиков Иван Иванович
          </div>
          <img className={isItem1MenuOpen ? `${styles.item_arrow_up} ` : `${styles.item_arrow}`} src={arrow} alt="arrow" />
        </div>
        <div className={isItem1MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
          <div className={styles.menu__item} onClick={() => dispatch(goToMyPage)}>
            Моя страница
          </div>
          <div className={styles.menu__item} onClick={() => dispatch(goToBalancePage)}>
            Пополнить баланс
          </div>
          <div className={styles.menu__item}>
            Выход
          </div>
        </div>
        <div className={styles.item_title} onClick={() => openMenuTransport()}>
          <div className={isItem2MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`}>
            <img src={truck} alt="truck" />
          </div>
          <div className={`${styles.item_name}`}>
            Я перевозчик
          </div>
          <img className={isItem2MenuOpen ? `${styles.item_arrow_up} ` : `${styles.item_arrow}`} src={arrow} alt="arrow" />
        </div>
        <div className={isItem2MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
          <div className={styles.menu__item} onClick={() => dispatch(goToCargoPage)}>
            Поиск груза
          </div>
          <div className={styles.menu__item} onClick={() => dispatch(goToTransportRegistration)}>
            Мой транспорт
          </div>
        </div>
        <div className={styles.item_title} onClick={() => openMenuCargo()}>
          <div className={isItem3MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`}>
            <img src={parcel} alt="parcel" />
          </div>
          <div className={`${styles.item_name}`}>
            Я грузоотправитель
          </div>
          <img className={isItem3MenuOpen ? `${styles.item_arrow_up} ` : `${styles.item_arrow}`} src={arrow} alt="arrow" />
        </div>
        <div className={isItem3MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
          <div className={styles.menu__item} onClick={() => dispatch(goToTransportPage)}>
            Поиск транспорта
          </div>
          <div className={styles.menu__item} onClick={() => dispatch(goToCargoRegistration)}>
            Мой груз
          </div>
        </div>
        <div className={styles.item_title} >
          <div className={styles.item}>
            <img src={balance} alt="balance" />
          </div>
          <div className={`${styles.item_name}`} onClick={() => dispatch(goToservicesPrices)}>
            Услуги и цены
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarFull;
