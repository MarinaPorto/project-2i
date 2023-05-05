import { NavLink } from 'react-router-dom';
import logo from './images/logo.png';
import styles from './header-registered.module.css'
import BoxLanguage from '../box-language/box-language';
import searchicon from './images/search.svg'
import messageicon from './images/message.svg'
import plusicon from './images/plus.svg'
import { useDispatch } from 'react-redux';
import { openBurger, closeBurger } from '../../redux/reducers/burger-reducer';

export function HeaderRegistered() {
  const dispatch = useDispatch();
  function changeBurgerMenu() {
    dispatch(openBurger());
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
        <div className={styles.header__functional_item}>
          <img src={searchicon} alt="search" />
        </div>
        <div className={styles.header__functional_item}>
          <img src={messageicon} alt="message" />
        </div>
        <div className={styles.header__functional_item}>
          <img src={plusicon} alt="plus" />
        </div>
      </div>
    </header>
  )
}

export default HeaderRegistered;