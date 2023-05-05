import styles from './home-page.module.css';
import icon from "./images/icon-attention.png"
import balance from "./images/balance.svg"
import parcel from "./images/parcel.svg"
import truck from "./images/truck.svg"
import { ReactComponent as Search } from "./images/search.svg";
import { ReactComponent as Plus } from "./images/plus.svg";
import { useDispatch } from 'react-redux';
import { openSelectedPage } from '../../../redux/reducers/selected-page-reducer';

export function HomePage() {

  const dispatch = useDispatch();

  function goToBalancePage() {
    dispatch(openSelectedPage("balancepage"))
  }

  function goToservicesPrices() {
    dispatch(openSelectedPage("servicesPrices"))
  }

  return (
    <div className={styles.home_wrapper}>
      <h2 className={`${styles.title} section__title `} >Добро пожаловать на IrisTrans.com!</h2>
      <div className={styles.home_items}>
        <div className={styles.notice__card}>
          <div className={styles.notice__title}>
            <img src={icon} alt="attention-icon" />
            <span> Внимание!</span>
          </div>
          <div className={styles.notice__text}>
            Для разблокировки процесса пользования услугами необходимо пройти:
          </div>
          <div className={styles.notice__items}>
            <div className={styles.notice__item}>
              <p>1.</p>
              <div className={styles.btn}>
                Пройти проверку профиля
              </div>
            </div>
            <div className={styles.notice__item}>
              <p>2.</p>
              <div className={styles.btn} onClick={() => dispatch(goToservicesPrices)}>
                Подключить пакеты услуг
              </div>
            </div>
            <div className={styles.notice__item}>
              <p>3.</p>
              <div className={styles.btn} onClick={() => dispatch(goToservicesPrices)}>
                Проверить срок подписки
              </div>
            </div>
          </div>
        </div>
        <div className={styles.services}>
          <div className={styles.services__btns}>
            <div className={styles.services__title}>
              <img src={balance} alt="balance" />
              <span>Услуги</span>
            </div>
            <div className={styles.services__btn}>
              <div className={`${styles.btn} ${styles.btn_serv} `} onClick={() => dispatch(goToBalancePage)}>
                Пополнить баланс
              </div>
              <div className={`${styles.btn} ${styles.btn_serv2} `} onClick={() => dispatch(goToservicesPrices)}>
                Все услуги
              </div>
            </div>
          </div>
          <div className={styles.services__text}>Баланс</div>
          <div className={styles.services__balance}>
            <div className={`${styles.btn} ${styles.btn_serv3} `}>
              Бесплатный
            </div>
            <div className={styles.services__sum}>О бел.руб.</div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.info__item}>
            <div className={styles.services__btns}>
              <div className={styles.services__title}>
                <img src={parcel} alt="balance" />
                <span>Груз</span>
              </div>
              <div className={styles.services__btn}>
                <div className={styles.info__icon}>
                  <Search className={styles.imfo__img}></Search>
                </div>
                <div className={styles.info__icon}>
                  <Plus className={styles.imfo__img}></Plus>
                </div>
              </div>
            </div>
            <div className={styles.info_count}>
              <div className={styles.count}>
                <p className={styles.count__title}>Активные</p>
                <p className={styles.count__number}>0</p>
              </div>
              <div className={styles.count}>
                <p className={styles.count__title}>Запланированные</p>
                <p className={styles.count__number}>0</p>
              </div>
            </div>
          </div>
          <div className={styles.info__item}>
            <div className={styles.services__btns}>
              <div className={styles.services__title}>
                <img src={truck} alt="truck" />
                <span>Транспорт</span>
              </div>
              <div className={styles.services__btn}>
                <div className={styles.info__icon}>
                  <Search className={styles.imfo__img}></Search>
                </div>
                <div className={styles.info__icon}>
                  <Plus className={styles.imfo__img}></Plus>
                </div>
              </div>
            </div>
            <div className={styles.info_count}>
              <div className={styles.count}>
                <p className={styles.count__title}>Активные</p>
                <p className={styles.count__number}>0</p>
              </div>
              <div className={styles.count}>
                <p className={styles.count__title}>Запланированные</p>
                <p className={styles.count__number}>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default HomePage;