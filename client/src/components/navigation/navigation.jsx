import { navItems } from "./nav-items";
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';
// import styles from './navigation-pers.module.css';
import arrow from './images/arrow.png';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeBurger } from '../../redux/reducers/burger-reducer';

export function Navigation() {
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);

  function changeSubMenu() {
    if (!isOpenSubMenu) {
      setIsOpenSubMenu(true)
    } else {
      setIsOpenSubMenu(false)
    }
  }

  const burger = useSelector(state => state.burger);
  const dispatch = useDispatch();

  function changeBurgerMenu() {
    dispatch(closeBurger());
  }

  return (
    <ul className={burger.burger ? `${styles.nav__list} ${styles.active}` : `${styles.nav__list}`}>
      {navItems.map(el => {
        if (el.submenu) {
          return (
            <li className={`${styles.subitem} ${styles.nav__item}`} onClick={changeSubMenu} key={el.path + "p"}>{el.title}<img src={arrow} alt="arrow" className={isOpenSubMenu ? `${styles.img_up}` : `${styles.img_order}`} />
              <ul className={isOpenSubMenu ? `${styles.nav__submenu}` : `${styles.nav__submenu_hidden}`} >
                {el.submenu.map(el => {
                  return (
                    <NavLink to={`pravila/${el.path}`} key={el.path + "1"} onClick={changeBurgerMenu}>
                      <li className={styles.nav__subitem} key={el.path + "link"}>{el.title}</li>
                    </NavLink>
                  )
                })}
              </ul>
            </li>
          )
        }
        return (
          <NavLink to={el.path} key={el.path} onClick={changeBurgerMenu}>
            <li className={styles.nav__item}>{el.title}</li>
          </NavLink>
        )
      })}
    </ul>
  )
}

export default Navigation;