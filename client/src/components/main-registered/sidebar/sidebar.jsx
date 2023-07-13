import styles from './sidebar.module.css';
import user from './images/user.png'
import parcel from './images/parcel.svg'
import truck from './images/truck.svg'
import balance from './images/balance.svg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openSelectedPage } from '../../../redux/reducers/selected-page-reducer';
import { logoutUserData } from '../../../redux/reducers/user-data-reducer';
import { saveFoundCargo } from '../../../redux/reducers/cargo-search-reducer';
import { saveCurrentImg } from '../../../redux/reducers/current-img-reducer';
import { saveCurrentID } from '../../../redux/reducers/current-id-reducer';
import AuthService from '../../../services/AuthService';
import { useTranslation } from "react-i18next";
export function Sidebar() {

  //Translation
  const { t } = useTranslation();

  const navigate = useNavigate();

  const userData = useSelector(state => state.userData.userData);
  const [isItem1MenuOpen, setIsItem1MenuOpen] = useState(false);
  const [isItem2MenuOpen, setIsItem2MenuOpen] = useState(false);
  const [isItem3MenuOpen, setIsItem3MenuOpen] = useState(false);
  const userWork = useSelector(state => state.userData.userData.work);

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
    openMenuBalance()
    dispatch(openSelectedPage("mypage"))
  }

  function goToUsersPage() {
    openMenuBalance()
    dispatch(openSelectedPage("userspage"))
  }
  function goToUsersInvoicePage() {
    openMenuBalance()
    dispatch(openSelectedPage("usersInvoicePage"))
  }
  function goToBalancePage() {
    openMenuBalance()
    dispatch(openSelectedPage("balancepage"))
  }
  function goToCargoPage() {
    openMenuBalance()
    dispatch(openSelectedPage("cargoSearch"))
    dispatch(saveCurrentID(""))
  }
  function goToTransportPage() {
    openMenuBalance()
    dispatch(openSelectedPage("transportSearch"))
    dispatch(saveCurrentID(""))
  }
  function goToTransportRegistration() {
    openMenuBalance()
    dispatch(openSelectedPage("transportRegistration"))
    dispatch(saveCurrentID(""))
  }
  function goToCargoRegistration() {
    openMenuBalance()
    dispatch(openSelectedPage("cargoRegistration"))
    dispatch(saveCurrentID(""))
  }
  function goToservicesPrices() {
    openMenuBalance()
    dispatch(openSelectedPage("servicesPrices"))
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
        <div className={isItem1MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} >
          <div className={isItem1MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} onClick={() => openMenuUser()}>
            <img src={user} alt="icon" />
          </div>
          {userData.role === "Admin" ?
            <div className={isItem1MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
              <div className={`${styles.menu__item} ${styles.item_name}`}>
                {`${userData.surname} ${userData.name} ${userData.secondname}`}
              </div>
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
              <div className={`${styles.menu__item} ${styles.item_name}`}>
                {`${userData.surname} ${userData.name} ${userData.secondname}`}
              </div>

              <div className={styles.menu__item} onClick={() => dispatch(goToMyPage)}>
                {/* Моя страница */}
                {t('my-page')}
              </div>
              <div className={styles.menu__item} onClick={() => dispatch(goToBalancePage)}>
                {/* Пополнить баланс */}
                {t('buy-tariff')}
              </div>
              <div className={styles.menu__item} onClick={() => logoutUser()}>
                {t('exit')}
                {/* Выход */}
              </div>
            </div>
          }
        </div>
        {userWork === "Перевозчик" &&
          <div className={isItem2MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} >
            <div className={isItem2MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} onClick={() => openMenuTransport()}>
              <img src={truck} alt="truck" />
            </div>

            <div className={isItem2MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
              <div className={styles.menu__item} onClick={() => dispatch(goToCargoPage)}>
                {/* Поиск груза */}
                {t('cargo-search')}
              </div>
              <div className={styles.menu__item} onClick={() => dispatch(goToTransportRegistration)}>
                {/* Мой транспорт */}
                {t('my-transport')}
              </div>
            </div>
          </div>
        }
        {userWork === "Грузоотправитель" &&
          <div className={isItem3MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} >
            <div className={isItem3MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} onClick={() => openMenuCargo()}>
              <img src={parcel} alt="parcel" />
            </div>
            <div className={isItem3MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
              <div className={styles.menu__item} onClick={() => dispatch(goToTransportPage)}>
                {/* Поиск транспорта */}
                {t('transport-search')}
              </div>
              <div className={styles.menu__item} onClick={() => { openMenuBalance(); goToCargoRegistration() }}>
                {/* Мой груз */}
                {t('my-cargo')}
              </div>
            </div>
          </div>
        }
        {(userWork === "Экспедитор" || userWork === "Admin") &&
          <div className={isItem2MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} >
            <div className={isItem2MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} onClick={() => openMenuTransport()}>
              <img src={truck} alt="truck" />
            </div>
            <div className={isItem2MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
              <div className={styles.menu__item} onClick={() => dispatch(goToCargoPage)}>
                {/* Поиск груза */}
                {t('cargo-search')}
              </div>
              <div className={styles.menu__item} onClick={() => dispatch(goToTransportRegistration)}>
                {/* Мой транспорт */}
                {t('my-transport')}
              </div>
            </div>
          </div>
        }
        {(userWork === "Экспедитор" || userWork === "Admin") &&
          <div className={isItem3MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} >
            <div className={isItem3MenuOpen ? `${styles.item} ${styles.item_bg}` : `${styles.item}`} onClick={() => openMenuCargo()}>
              <img src={parcel} alt="parcel" />
            </div>
            <div className={isItem3MenuOpen ? `${styles.menu}` : `${styles.menu__hidden}`}>
              <div className={styles.menu__item} onClick={() => dispatch(goToTransportPage)}>
                {/* Поиск транспорта */}
                {t('transport-search')}
              </div>
              <div className={styles.menu__item} onClick={() => { openMenuBalance(); goToCargoRegistration() }}>
                {/* Мой груз */}
                {t('my-cargo')}
              </div>
            </div>
          </div>
        }
        <div className={styles.item} onClick={() => { openMenuBalance(); goToservicesPrices() }}>
          <img src={balance} alt="balance" />
        </div>
      </div>
    </div>
  )
}
export default Sidebar;