import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from './images/logo.png';
import styles from './header-registered.module.css'
import BoxLanguage from '../box-language/box-language';
import searchicon from './images/search.svg'
import messageicon from './images/message.svg'
import plusicon from './images/plus.svg'
import parcel from './images/parcel.svg'
import truck from './images/truck.svg'
import { useDispatch, useSelector } from 'react-redux';
import { openBurger, closeBurger } from '../../redux/reducers/burger-reducer';
import { openSelectedPage } from '../../redux/reducers/selected-page-reducer';
import { openChat } from '../../redux/reducers/chat-reducer';
import { openSearchInput, closeSearchInput } from '../../redux/reducers/search-reducer';
import { saveFoundCargo } from '../../redux/reducers/cargo-search-reducer';
import { saveFoundTransport } from '../../redux/reducers/transport-search-reducer';

import axios from "axios";

export function HeaderRegistered() {
  const [isOpenAddItem, setisOpenAddItem] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const userWork = useSelector(state => state.userData.userData.work);
  const searchIsOpen = useSelector(state => state.searchIsOpen.searchIsOpen);
  const countUnreadMessages = useSelector(state => state.unreadMessages.countUnreadMessages);
  const dispatch = useDispatch();
  function changeBurgerMenu() {
    dispatch(openBurger());
  }

  function closeAddMenu(path) {
    dispatch(openSelectedPage(path))
    setisOpenAddItem(false)
  }

  async function getSearchCargos() {
    try {
      if (!searchIsOpen) {
        dispatch(openSearchInput());
      } else if (searchValue) {
        if (userWork === "Грузоотправитель") {
          const response = await axios.get(`http://178.172.173.84:5000/api/transport/searchlist/${searchValue}`)
          dispatch(saveFoundTransport(response.data));
          dispatch(openSelectedPage("transportSearch"))
          setSearchValue("")
        } if (userWork === "Перевозчик") {
          const response = await axios.get(`http://178.172.173.84:5000/api/cargo/searchlist/${searchValue}`)
          dispatch(saveFoundCargo(response.data));
          dispatch(openSelectedPage("cargoSearch"))
          setSearchValue("")
        } if (userWork === "Экспедитор" || userWork === "Admin") {
          const responseCargo = await axios.get(`http://178.172.173.84:5000/api/cargo/searchlist/${searchValue}`)
          dispatch(saveFoundCargo(responseCargo.data));
          dispatch(saveFoundTransport([]));
          dispatch(openSelectedPage("cargoSearch"))
          if (responseCargo.data.length === 0) {
            const responseTransport = await axios.get(`http://178.172.173.84:5000/api/transport/searchlist/${searchValue}`)
            dispatch(saveFoundTransport(responseTransport.data));
            if (responseTransport.data.length > 0) {
              dispatch(saveFoundCargo([]));
            }
            dispatch(openSelectedPage("transportSearch"))
          } else
            setSearchValue("")
        }
        dispatch(closeSearchInput(false));
      } else {
        dispatch(closeSearchInput(false));
      }
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.burger__btn} onClick={changeBurgerMenu}>
        <span className={styles.burger__icon}></span>
      </div>
      <NavLink to="/" key='logo' >
        <img src={logo} alt="logo" className={styles.logo} onClick={() => dispatch(closeBurger())} />
      </NavLink>
      <BoxLanguage />
      <div className={styles.header__functional_items}>
        <div className={styles.header__search_block}>
          {searchIsOpen &&
            <input className={styles.header__search_input} type="text" name="search" id="search" placeholder='Начните поиск' value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
          }
          <div className={styles.header__functional_item} onClick={() => getSearchCargos()}>
            <img src={searchicon} alt="search" />
          </div>
        </div>

        <div className={styles.header__functional_item} onClick={() => dispatch(openChat())}>
          {(countUnreadMessages > 0) &&
            <div className={styles.header__new_message}>
              {countUnreadMessages}
            </div>}
          <img src={messageicon} alt="message" />
        </div>
        <div className={styles.header__functional_item} onClick={() => (setisOpenAddItem(!isOpenAddItem))}>
          <img src={plusicon} alt="add" />
        </div>
        {isOpenAddItem &&
          <div className={styles.add_items}>
            {userWork === "Грузоотправитель" &&
              <div className={styles.add_item} onClick={() => closeAddMenu("cargoRegistration")}>
                <div className={styles.add_item_img}>
                  <img src={parcel} alt="parcel" />
                </div>
                Груз
              </div>}
            {userWork === "Перевозчик" &&
              <div className={styles.add_item} onClick={() => closeAddMenu("transportRegistration")}>
                <div className={styles.add_item_img}>
                  <img src={truck} alt="truck" />
                </div>
                Транспорт
              </div>}
            {(userWork === "Экспедитор" || userWork === "Admin") &&
              <>
                <div className={styles.add_item} onClick={() => closeAddMenu("cargoRegistration")}>
                  <div className={styles.add_item_img}>
                    <img src={parcel} alt="parcel" />
                  </div>
                  Груз
                </div>
                <div className={styles.add_item} onClick={() => closeAddMenu("transportRegistration")}>
                  <div className={styles.add_item_img}>
                    <img src={truck} alt="truck" />
                  </div>
                  Транспорт
                </div>
              </>
            }
          </div>}
      </div>
    </header>
  )
}

export default HeaderRegistered;