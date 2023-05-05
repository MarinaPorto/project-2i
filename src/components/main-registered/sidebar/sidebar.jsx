import styles from './sidebar.module.css';
import user from './images/user.png'
import parcel from './images/parcel.svg'
import truck from './images/truck.svg'
import balance from './images/balance.svg'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openSelectedPage } from '../../../redux/reducers/selected-page-reducer';

export function Sidebar() {
  const [isItem1MenuOpen, setIsItem1MenuOpen] = useState(false);
  const [isItem2MenuOpen, setIsItem2MenuOpen] = useState(false);
  const [isItem3MenuOpen, setIsItem3MenuOpen] = useState(false);

  function openMenuUser() {
    setIsItem1MenuOpen(true);
    setIsItem2MenuOpen(false);
    setIsItem3MenuOpen(false);
  }
  function openMenuTransport() {
    setIsItem1MenuOpen(false);
    setIsItem2MenuOpen(true);
    setIsItem3MenuOpen(false);
  }
  function openMenuCargo() {
    setIsItem1MenuOpen(false);
    setIsItem2MenuOpen(false);
    setIsItem3MenuOpen(true);
  }
  function openMenuBalance() {
    setIsItem1MenuOpen(false);
    setIsItem2MenuOpen(false);
    setIsItem3MenuOpen(false);
  }

  const dispatch = useDispatch();


  function goToMyPage() {

    dispatch(openSelectedPage("mypage"))

  }
  function goToBalancePage() {
    dispatch(openSelectedPage("balancepage"))

  }
  function goToCargoPage() {
    dispatch(openSelectedPage("cargoSearch"))

  }
  function goToTransportPage() {
    dispatch(openSelectedPage("transportSearch"))

  }
  function goToTransportRegistration() {
    dispatch(openSelectedPage("transportRegistration"))

  }
  function goToCargoRegistration() {
    dispatch(openSelectedPage("cargoRegistration"))

  }

  function goToservicesPrices() {
    dispatch(openSelectedPage("servicesPrices"))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <div className={isItem1MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} onClick={() => openMenuUser()}>
          <img src={user} alt="icon" />

          <div className={isItem1MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
            <div className={`${styles.menu__item} ${styles.item_name}`}>
              Иванчиков Иван Иванович
            </div>
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
        </div>
        <div className={isItem2MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} onClick={() => openMenuTransport()}>
          <img src={truck} alt="truck" />
          <div className={isItem2MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
            <div className={styles.menu__item} onClick={() => dispatch(goToCargoPage)}>
              Поиск груза
            </div>
            <div className={styles.menu__item} onClick={() => dispatch(goToTransportRegistration)}>
              Мой транспорт
            </div>
          </div>
        </div>
        <div className={isItem3MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} onClick={() => openMenuCargo()}>
          <img src={parcel} alt="parcel" />
          <div className={isItem3MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
            <div className={styles.menu__item} onClick={() => dispatch(goToTransportPage)}>
              Поиск транспорта
            </div>
            <div className={styles.menu__item} onClick={() => { openMenuBalance(); goToCargoRegistration() }}>
              Мой груз
            </div>
          </div>
        </div>
        <div className={styles.item} onClick={() => { openMenuBalance(); goToservicesPrices() }}>
          <img src={balance} alt="balance" />
        </div>
      </div>
    </div>
  )
}


export default Sidebar;
