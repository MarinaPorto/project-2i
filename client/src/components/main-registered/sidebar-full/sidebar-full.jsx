import styles from './sidebar-full.module.css';
import arrow from './images/arrow.png';
import user from './images/user.png'
import parcel from './images/parcel.svg'
import truck from './images/truck.svg'
import balance from './images/balance.svg'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openSelectedPage } from '../../../redux/reducers/selected-page-reducer';
import { closeBurger } from '../../../redux/reducers/burger-reducer';
import { logoutUserData } from '../../../redux/reducers/user-data-reducer';
import { saveFoundCargo } from '../../../redux/reducers/cargo-search-reducer';
import { saveCurrentImg } from '../../../redux/reducers/current-img-reducer';
import { saveCurrentID } from '../../../redux/reducers/current-id-reducer';
import AuthService from '../../../services/AuthService';

export function SidebarFull() {
  const navigate = useNavigate();
  const userData = useSelector(state => state.userData.userData);
  const [isItem1MenuOpen, setIsItem1MenuOpen] = useState(false);
  const [isItem2MenuOpen, setIsItem2MenuOpen] = useState(false);
  const [isItem3MenuOpen, setIsItem3MenuOpen] = useState(false);
  const userWork = useSelector(state => state.userData.userData.work);
  const dispatch = useDispatch();

  function openMenuUser() {
    setIsItem1MenuOpen(!isItem1MenuOpen);
  }
  function openMenuTransport() {
    setIsItem2MenuOpen(!isItem2MenuOpen);
  }
  function openMenuCargo() {
    setIsItem3MenuOpen(!isItem3MenuOpen);
  }

  function goToMyPage() {
    dispatch(openSelectedPage("mypage"))
    dispatch(closeBurger());
  }

  function goToUsersPage() {
    dispatch(openSelectedPage("userspage"))
    dispatch(closeBurger());
  }
  function goToUsersInvoicePage() {

    dispatch(openSelectedPage("usersInvoicePage"))
    dispatch(closeBurger());
  }

  function goToBalancePage() {
    dispatch(openSelectedPage("balancepage"))
    dispatch(closeBurger());
  }
  function goToCargoPage() {
    dispatch(openSelectedPage("cargoSearch"))
    dispatch(closeBurger());
    dispatch(saveCurrentID(""))
  }
  function goToTransportPage() {
    dispatch(openSelectedPage("transportSearch"))
    dispatch(closeBurger());
    dispatch(saveCurrentID(""))
  }
  function goToTransportRegistration() {
    dispatch(openSelectedPage("transportRegistration"))
    dispatch(closeBurger());
    dispatch(saveCurrentID(""))
  }
  function goToCargoRegistration() {
    dispatch(openSelectedPage("cargoRegistration"))
    dispatch(closeBurger());
    dispatch(saveCurrentID(""))
  }
  function goToservicesPrices() {
    dispatch(openSelectedPage("servicesPrices"))
    dispatch(closeBurger());
  }


  const logoutUser = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      dispatch(logoutUserData());
      dispatch(saveFoundCargo(""))
      dispatch(saveCurrentImg(""))
      dispatch(openSelectedPage("homepage"))
      navigate("/");
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <div className={styles.item_title} onClick={() => openMenuUser()}>
          <div className={isItem1MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`}>
            <img src={user} alt="icon" />
          </div>
          <div className={`${styles.item_name}`}>
            {`${userData.surname} ${userData.name} ${userData.secondname}`}
          </div>
          <img className={isItem1MenuOpen ? `${styles.item_arrow_up} ` : `${styles.item_arrow}`} src={arrow} alt="arrow" />
        </div>
        {userData.role === "Admin" ?
          <div className={isItem1MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
            <div className={styles.menu__item} onClick={() => dispatch(goToUsersPage)}>
              Список пользователей
            </div>
            <div className={styles.menu__item} onClick={() => dispatch(goToUsersInvoicePage)}>
              Запросы счета-фактуры
            </div>
            <div className={styles.menu__item} onClick={() => logoutUser()}>
              Выход
            </div>
          </div> :

          <div className={isItem1MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
            <div className={styles.menu__item} onClick={() => dispatch(goToMyPage)}>
              Моя страница
            </div>
            <div className={styles.menu__item} onClick={() => dispatch(goToBalancePage)}>
              Пополнить баланс
            </div>
            <div className={styles.menu__item} onClick={() => logoutUser()}>
              Выход
            </div>
          </div>
        }

        {userWork === "Перевозчик" &&
          <>
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
          </>
        }
        {userWork === "Грузоотправитель" &&
          <>
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
          </>
        }
        {(userWork === "Экспедитор" || userWork === "Admin") &&
          <>
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
          </>
        }
        {(userWork === "Экспедитор" || userWork === "Admin") &&
          <>
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
          </>
        }
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
