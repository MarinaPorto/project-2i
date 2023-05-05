import styles from './user-page.module.css';
import parcel from "./images/parcel.svg"
import truck2 from "./images/truck2.svg"
import star from "./images/star.svg"
import starbl from "./images/star-black.svg"
import nologo from "./images/no-logo.jpg"
import like from "./images/like.svg"
import likebl from "./images/like-black.svg"
import pencil from "./images/pencil.svg"


export function UserPage() {
  return (
    <div className={styles.user_wrapper}>
      <section className={`${styles.block} ${styles.block__profile} `}>
        <div className={styles.block__header}>
          <div className={styles.user_name_header}>
            Иванчиков Иван Иванович
          </div>
          <div className={styles.user_check}>
            профиль непроверен
            <img src={star} alt="star" />
          </div>
        </div>
        <div className={styles.block__content}>
          <div className={styles.content__inner}>
            <div className={styles.logo__wrapper}>
              <div className={styles.user__status}></div>
              <img className={styles.user__logo} src={nologo} alt="logo" />
            </div>
            <div className={styles.user_info}>
              <p className={styles.user_name}>Иванчиков Иван Иванович</p>
              <p className={styles.user_city}>Минск, Беларусь</p>
              <div className={styles.user_grade}>
                <div className={styles.user_stars}>
                  <span className={styles.stars__count}>0</span>
                  <img className={styles.star_icon} src={starbl} alt="star" />
                </div>
                <div className={styles.user_likes}>
                  <div className={styles.likes}>
                    <img className={styles.like_icon} src={likebl} alt="star" />
                    <span className={styles.like__count}>0</span>
                  </div>
                  <div className={styles.likes}>
                    <img className={styles.unlike_icon} src={likebl} alt="star" />
                    <span className={styles.unlike__count}>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.user_data}>
        <section className={`${styles.block} ${styles.block__data} `}>
          <div className={styles.block__header}>
            <div className={styles.header_title}>
              Регистрационные данные
            </div>
          </div>
          <div className={styles.block__content}>
            <div className={styles.content__inner}>

              <ul className={styles.data_items}>
                <li className={styles.data_item}>
                  <span>Наименование</span>
                  <span>Иванчиков Иван Иванович, Физическое лицо</span>
                </li>
                {/* <li className={styles.data_item}>
                  <span>УНП</span>
                  <span>123456789</span>
                </li> */}
                <li className={styles.data_item}>
                  <span>Страна</span>
                  <span>Беларусь</span>
                </li>
                <li className={styles.data_item}>
                  <span>Область</span>
                  <span>Минская область</span>
                </li>
                <li className={styles.data_item}>
                  <span>Город</span>
                  <span>Минск</span>
                </li>
                <li className={styles.data_item}>
                  <span>Дата регистрации</span>
                  <span>01.01.2023</span>
                </li>


              </ul>
            </div>
          </div>
        </section>
        <section className={`${styles.block} ${styles.block__data} `}>
          <div className={styles.block__header}>
            <div className={styles.header_title}>
              Контакты
            </div>
            <div className={styles.data__edit}>
              <img src={pencil} alt="edit" />
            </div>
          </div>
          <div className={styles.block__content}>
            <div className={styles.content__inner}>
              <ul className={styles.data_items}>
                {/* <li className={styles.data_item}>
                  <span>Контактное лицо</span>
                  <span>Фамилия Имя Отчество</span>
                </li> */}
                <li className={styles.data_item}>
                  <span>Телефон</span>
                  <span>+375 (33) - 111–11–11</span>
                </li>
                <li className={styles.data_item}>
                  <span>Email</span>
                  <span>mail@mail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.user_data_stat}>
        <section className={`${styles.block} ${styles.block__data} `}>
          <div className={styles.block__header}>
            <div className={styles.header_title}>
              Мой груз
            </div>
          </div>
          <div className={styles.block__content}>
            <div className={styles.content__inner}>
              <div className={styles.info__data}>
                <div className={styles.services__btns}>
                  <div className={styles.services__title}>
                    <img src={parcel} alt="balance" />
                    <span>Груз</span>
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
        </section>
        <section className={`${styles.block} ${styles.block__data} ${styles.block__data2}`}>
          <div className={styles.block__header}>
            <div className={styles.header_title}>
              Мой транспорт
            </div>
          </div>
          <div className={styles.block__content}>
            <div className={styles.content__inner}>
              <div className={styles.info__data}>
                <div className={styles.services__btns}>
                  <div className={styles.services__title}>
                    <img src={truck2} alt="truck" />
                    <span>Транспорт</span>
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
        </section>
        <section className={`${styles.block} ${styles.block__data} ${styles.data_reviews}`}>
          <div className={styles.block__header}>
            <div className={styles.header_title}>
              Отзывы
            </div>
          </div>
          <div className={styles.block__content}>
            <div className={styles.content__inner}>
              <div className={styles.reviews}>
                <div className={styles.reviews__info}>
                  <p>Положительные</p>
                  <div className={styles.reviews_likes}>
                    <img className={styles.like_icon} src={like} alt="star" />
                    <span className={styles.like__count}>1000000000</span>
                  </div>
                </div>
                <div className={styles.reviews__info}>
                  <p>Отрицательные</p>
                  <div className={styles.reviews_likes}>
                    <img className={styles.unlike_icon} src={like} alt="star" />
                    <span className={styles.like__count}>1000000000</span>
                  </div>
                </div>
              </div>
            </div>          </div>
        </section>
      </div>
    </div >

  )
}
export default UserPage;