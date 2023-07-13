import Button from '../button/button';
import { CardMainTop } from '../card-main-top';
import { useDispatch } from 'react-redux';
import styles from './main-top.module.css';
// import styles from './main-top-pers.module.css';
import auto from './images/icons/auto.svg'
import box from './images/icons/box.svg'
import plus from './images/icons/plus.svg'
import like from './images/icons/like.svg'
import React from "react";
import { openRegistrForm, } from '../../redux/reducers/registration-reducer';


export function MainTop() {

  const dispatch = useDispatch();

  function changeRegistrationOpen() {
    dispatch(openRegistrForm());
  }

  return (
    <div className={styles.mainTopWrapper}>
      <div className="inner">
        <div className={styles.main__wrapper}>
          <div className={styles.mainTopInfo}>
            <h1 className={styles.mainTopTitle}>
              Международный поиск<br />груза и транспорта
            </h1>
            <h2 className={styles.mainTopSubTitle}>IrisTrans.com</h2>
            <Button click={changeRegistrationOpen}>Регистрация</Button>
          </div>
          <div className={styles.main__top_cards}>
            <CardMainTop img={auto}
              title="Поиск транспорта"
              subtitle="Инструмент по поиску транспорта"
            > </CardMainTop>
            <CardMainTop img={box}
              title="Поиск груза"
              subtitle="Инструмент по поиску груза для перевозки"
            > </CardMainTop>
            <CardMainTop img={plus}
              title="Добавление транспорта и груза"
              subtitle="Инструмент по добавлению транспорта и груза для перевозки"
            > </CardMainTop>
            <CardMainTop img={like}
              title="Отзывы и рейтинг"
              subtitle="Система рейтинга для определения надёжности сотрудничества"
            > </CardMainTop>
          </div>
        </div>
      </div>

    </div>
  )
}
export default MainTop;