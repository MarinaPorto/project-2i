import styles from './details.module.css';
import { openSelectedPage } from '../../../redux/reducers/selected-page-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { saveCurrentSelectedUser } from '../../../redux/reducers/current-selected-user-reducer';

import icon from './images/icon.svg'
import map from './images/map.jpg'
import like from './images/like.png'
import antilike from './images/antilike.png'
import { NavLink } from 'react-router-dom';

export function Details(props) {

  const myCargoList = useSelector(state => state.cargoUsers.cargoUser);
  const foundCargo = useSelector(state => state.cargoFound.cargoFound);
  let resultsData = (props.typeOfAction === "searchCargo") ? foundCargo : myCargoList
  const dispatch = useDispatch();
  let currentItemDetails = resultsData.find(item => item.id === props.currentID);
  const userData = useSelector(state => state.userData.userData);

  function goToBalancePage() {
    dispatch(openSelectedPage("balancepage"))
  }
  function goToUserPage() {
    dispatch(openSelectedPage("anotherUserPage"))
    dispatch(saveCurrentSelectedUser(currentItemDetails.user))
  }

  function dateParse(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    if (month < 10) {
      month = `0${month}`;
      return `${day}.${month}.${year}`;
    }
  }


  return (
    <>
      {currentItemDetails &&

        <div className={styles.user_wrapper}>
          <div className={styles.payment}>
            <section className={`${styles.block} ${styles.block__data} `}>
              <div className={styles.block__header}>
                <div className={styles.header_title}>
                  Информация
                </div>
              </div>
            </section>
          </div>
          <div className={styles.payment_data}>
            <div className={styles.user_data}>
              <section className={`${styles.block} ${styles.block__data} `}>
                <div className={styles.block__header}>
                  <div className={styles.header_title}>
                    Общее
                  </div>
                </div>
                <div className={styles.block__content}>
                  <div className={styles.content__inner}>
                    <ul className={styles.data_items}>
                      <li className={styles.data_item}>
                        <p>Дата публикации</p>
                        <p className={styles.item_text}>{dateParse(currentItemDetails.createdAt)}</p>
                      </li>
                      <li className={styles.data_item}>
                        <p>Остановки</p>
                        <p className={styles.item_text}>-</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className={`${styles.block} ${styles.block__data} `}>
                <div className={styles.block__header}>
                  <div className={styles.header_title}>
                    Маршрут
                  </div>
                </div>
                <div className={styles.block__content}>
                  <div className={styles.content__inner}>
                    <ul className={styles.data_items}>
                      <li className={styles.data_item}>
                        <p>Загрузка</p>
                        <p className={styles.item_text}>{currentItemDetails.cityfrom}</p>
                      </li>
                      <li className={styles.data_item}>
                        <p>Выгрузка</p>
                        <p className={styles.item_text}>{currentItemDetails.cityto}</p>
                      </li>
                      <li className={styles.data_item}>
                        <p>Расстояние</p>
                        <p className={styles.item_text}>-</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className={`${styles.block} ${styles.block__data} `}>
                <div className={styles.block__header}>
                  <div className={styles.header_title}>
                    Груз
                  </div>
                </div>
                <div className={styles.block__content}>
                  <div className={styles.content__inner}>
                    <ul className={styles.data_items}>
                      <li className={styles.data_item}>
                        <p>Дата загрузки</p>
                        <p className={styles.item_text}>  {(currentItemDetails.calendar !== null) ? dateParse(currentItemDetails.calendar) : "-"}</p>
                      </li>
                      <li className={styles.data_item}>
                        <p>Тип кузова</p>
                        <p className={styles.item_text}> {(currentItemDetails.transporttype && currentItemDetails.transporttype.length > 0) ?
                          currentItemDetails.transporttype.map((transport, index) => {
                            if (index === currentItemDetails.transporttype.length - 1) {
                              return (
                                <span key={index + transport.id}>{transport.name || transport.value} </span>
                              )
                            }
                            return (
                              <span key={index + transport.id}>{transport.name || transport.value}, </span>
                            )
                          })
                          : "-"
                        }</p>
                      </li>
                      <li className={styles.data_item}>
                        <p>Груз</p>
                        <p className={styles.item_text}> {(currentItemDetails.danger) ? currentItemDetails.danger : "-"}</p>
                      </li>
                      <li className={styles.data_item}>
                        <p>Масса</p>
                        <p className={styles.item_text}> {(currentItemDetails.weighMax > 0) ? `${currentItemDetails.weighMax} т` : "-"}</p>
                      </li>
                      <li className={styles.data_item}>
                        <p>Оплата</p>
                        <p className={styles.item_text}>    {(currentItemDetails.paymenttype && currentItemDetails.paymenttype.length > 0) ?
                          currentItemDetails.paymenttype.map((payment, index) => {
                            if (index === currentItemDetails.paymenttype.length - 1) {
                              return (
                                <span key={index + payment.id}>{payment.name || payment.value}</span>
                              )
                            }
                            return (
                              <span key={index + payment.id}>{payment.name || payment.value}, </span>
                            )
                          })
                          : "-"
                        }</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
            <div className={styles.user_data}>
              <section className={`${styles.block} ${styles.block__data} `}>
                <div className={styles.block__header}>
                  <div className={styles.header_title}>
                    Контактная информация
                  </div>
                </div>
                {(userData.isPaid || userData.role === "Admin") ?
                  <div className={`${styles.block__content} ${styles.block__content_contacts} `}>
                    <div className={styles.content__inner}>
                      <ul className={styles.data_items}>
                        <li className={styles.data_item}>
                          <p>Название</p>
                          <p className={styles.item_text} onClick={() => goToUserPage()}>{currentItemDetails.user.orgname}</p>
                        </li>
                        <li className={styles.data_item}>
                          <p>Контактное лицо</p>
                          <NavLink to={`/user/${currentItemDetails.user.id}`}>
                            <div className={styles.item_text}>{currentItemDetails.user.name}<div className={styles.item_text_inner}><div>{currentItemDetails.user.number}</div><div></div></div></div>
                            {/* <div className={styles.item_text} onClick={() => goToUserPage()}>{currentItemDetails.user.name}<div className={styles.item_text_inner}><div>{currentItemDetails.user.number}</div><div></div></div></div> */}
                          </NavLink>
                        </li>
                        <li className={styles.data_item}>
                          <p>Отзывы</p>
                          <div className={styles.item_text_likes}>
                            <div className={styles.item_likes_block}>
                              <div className={`${styles.item_likes} ${styles.item_like}`}>
                                <img src={like} alt="like" className={styles.like_img} /> 0</div>
                            </div>
                            <div className={`${styles.item_likes} ${styles.item_antilike}`}>
                              <img src={antilike} alt="antilike" className={styles.like_img} /> 0</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div> : <div className={`${styles.block__content} ${styles.block__content_contacts} `}>
                    <div className={styles.content__inner_contacts}>
                      <img src={icon} alt="icon" />
                      <span>Контактная информация не доступна в вашем тарифном плане, оформите подписку</span>
                    </div>
                    <div className={styles.btn} onClick={() => goToBalancePage()}>
                      Подключить подписку
                    </div>
                  </div>
                }
              </section>
              <section className={`${styles.block} ${styles.block__data} `}>
                <div className={styles.block__header}>
                  <div className={styles.header_title}>
                    Маршрут на карте
                  </div>
                </div>
                <div className={`${styles.block__content} ${styles.block__content_map} `}>
                  <img src={map} alt="map" />
                </div>
              </section>
            </div>
          </div>
        </div >}
    </>
  )
}
export default Details;