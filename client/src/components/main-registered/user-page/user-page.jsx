/* eslint-disable no-unused-vars */
import styles from './user-page.module.css';
import parcel from "./images/parcel.svg";
import truck2 from "./images/truck2.svg";
import star from "./images/star.svg";
import staractive from "./images/star-active.svg";
import starbl from "./images/star-black.svg";
import nologo from "./images/no-logo.jpg";
import like from "./images/like.svg";
import likebl from "./images/like-black.svg";
import pencil from "./images/pencil.svg";
import { useSelector, useDispatch } from 'react-redux';
import { uploadAvatar } from '../../../http/userAPI';

import { useRef, useState, useEffect } from 'react';
import { saveCurrentImg } from '../../../redux/reducers/current-img-reducer';
import axios from "axios";
import { UserUpdate } from '../update-user-data-form';
import { toggleEditForm } from '../../../redux/reducers/edit-form-reducer';
import { useTranslation } from "react-i18next";


export function UserPage({ onlineUsers }) {
  const { t } = useTranslation();
  const userData = useSelector(state => state.userData.userData);
  const editForm = useSelector(state => state.editForm.editForm);

  let variable = {
    likesRecipientId: userData.id
  }

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);
  const [onlineUser, setOnlineUsers] = useState(onlineUsers);
  const userIsOnline = onlineUser.some(user => user.userId === userData.id);

  async function getLikes() {
    try {
      const response = await axios.post('http://178.172.173.84:5000/api/user/like', variable)
      setLikes(response.data.length)
      if (response.data.length > 0) {
        response.data.length.map(like => {
          if (like.likesSenderId === userData.id) {
            setLikeAction("liked")
          }
          return "liked"
        })
      }

    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }
  async function getDislikes() {
    try {
      const response = await axios.post('http://178.172.173.84:5000/api/user/dislike', variable)
      setDislikes(response.data.length)
      if (response.data.length > 0) {
        response.data.length.map(dislike => {
          if (dislike.likesSenderId === userData.id) {
            setDislikeAction("disliked")
          }
          return "disliked"
        })
      }
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  useEffect(() => {
    getLikes();
    getDislikes();
  }
  )

  const dispatch = useDispatch();
  const countOfCargos = useSelector(state => state.cargoUsers.cargoUser);
  const countOfTransports = useSelector(state => state.transportsUser.transportsUser);
  const userAuht = useSelector(state => state.userData.auth);
  const hiddenFileInput = useRef(null);
  const userLogo = useSelector(state => state.currentImg.currentImg);
  const userWork = useSelector(state => state.userData.userData.work);
  let avatar = userData.img ? `http://178.172.173.84:5000/avatars/${userData.img}` : nologo;
  let userStat = (userWork === "Грузоотправитель" || userWork === "Перевозчик") ? styles.user_data_stat2 : styles.user_data_stat;

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

  let formData = new FormData();

  async function changeHandler(e) {
    const file = e.target.files[0];
    if (file.size > 2e6) {
      window.alert("Please upload a file smaller than 2 MB");
      return false;

    } else {
      if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
        formData.append('file', file);
        formData.append('userId', userData.id);
        let newAvatar = await uploadAvatar(formData)
        avatar = `http://178.172.173.84:5000/avatars/${newAvatar.data}`
        formData = new FormData();
        dispatch(saveCurrentImg(avatar))
      }
      else {
        window.alert("Please upload image");
      }
    }
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const editHandler = () => {
    dispatch(toggleEditForm())
  }

  return (
    <div className={styles.user_wrapper}>
      <section className={`${styles.block} ${styles.block__profile} `}>
        <div className={styles.block__header}>
          <div className={styles.user_name_header}>
            {(userData.role === "Юридическое лицо") ? `${userData.orgname}` : `${userData.surname} ${userData.name} ${userData.secondname}`}
          </div>
          {userData.isActivated ?
            <div className={styles.user_check}>
              профиль проверен
              <img src={staractive} alt="star" />
            </div> :
            <div className={styles.user_check}>
              профиль непроверен
              <img src={star} alt="star" />
            </div>
          }
        </div>
        <div className={styles.block__content}>
          <div className={styles.content__inner}>
            <div className={styles.logo__wrapper}>
              <div className={styles.user__status}></div>
              <div className={userIsOnline ? `${styles.user__status_active}` : ` ${styles.user__status}`}></div>
              <img className={styles.user__logo} src={userLogo ? userLogo : avatar} alt="logo" onClick={handleClick} />
            </div>
            <input className={`${styles.input} ${styles.input_verification}`} type="file" id="avatar" name="avatar" ref={hiddenFileInput} onChange={e => changeHandler(e)} placeholder="Загрузить изображение" style={{ display: 'none' }} accept="image/png, image/jpeg" />
            <div className={styles.user_info}>
              <p className={styles.user_name}>{(userData.role === "Юридическое лицо") ? `${userData.orgname}` : `${userData.surname} ${userData.name} ${userData.secondname}`}</p>
              <p className={styles.user_city}> {`${userData.city}, ${userData.country} `}</p>
              <div className={styles.user_grade}>
                <div className={styles.user_stars}>
                  <span className={styles.stars__count}>0</span>
                  <img className={styles.star_icon} src={starbl} alt="star" />
                </div>
                <div className={styles.user_likes}>
                  <div className={styles.likes}>
                    <img className={styles.like_icon} src={likebl} alt="star" />
                    <span className={styles.like__count}>{likes}</span>
                  </div>
                  <div className={styles.likes}>
                    <img className={styles.unlike_icon} src={likebl} alt="star" />
                    <span className={styles.unlike__count}>{dislikes}</span>
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
              {t('registration-details')}
              {/* Регистрационные данные */}
            </div>
          </div>
          <div className={styles.block__content}>
            <div className={styles.content__inner}>
              <ul className={styles.data_items}>
                <li className={styles.data_item}>
                  <span>Наименование</span>
                  {userData.role === "Юридическое лицо" ? <span> {`${userData.orgname}, ${userData.role}`}</span> : <span> {`${userData.surname} ${userData.name} ${userData.secondname}, ${userData.role}`}</span>}
                </li>
                {(userData.role === "Юридическое лицо") && <li className={styles.data_item}>
                  <span>УНП</span>
                  {(userData.role === "Юридическое лицо") && <span> {`${userData.unp}`}</span>}
                </li>}
                <li className={styles.data_item}>
                  <span>Страна</span>
                  <span> {`${userData.country} `}</span>
                </li>
                <li className={styles.data_item}>
                  <span>Город</span>
                  <span> {`${userData.city}`}</span>
                </li>
                <li className={styles.data_item}>
                  <span>Дата регистрации</span>
                  <span>{dateParse(userData.createdAt)}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className={`${styles.block} ${styles.block__data} `}>
          <div className={styles.block__header}>
            <div className={styles.header_title}>
              {t('contact')}
              {/* Контакты */}
            </div>
            <div className={styles.data__edit} onClick={editHandler}>
              <img src={pencil} alt="edit" />
            </div>
          </div>
          {editForm ? <UserUpdate /> :
            <div className={styles.block__content}>
              <div className={styles.content__inner}>
                <ul className={styles.data_items}>
                  {(userData.role === "Юридическое лицо") && <li className={styles.data_item}>
                    <span>Контактное лицо</span>
                    {(userData.role === "Юридическое лицо") && <span> {`${userData.name}`}</span>}
                  </li>}
                  <li className={styles.data_item}>
                    <span>Телефон</span>
                    <span> {`${userData.number}`}</span>
                  </li>
                  <li className={styles.data_item}>
                    <span>Email</span>
                    <span>{`${userData.email}`}</span>
                  </li>
                </ul>
              </div>
            </div>
          }
        </section>
      </div>
      <div className={userStat} >
        {(userWork === "Экспедитор" || userWork === "Admin") &&
          <>
            <section className={`${styles.block} ${styles.block__data} `}>
              <div className={styles.block__header}>
                <div className={styles.header_title}>
                  {t('my-cargo')}
                  {/* Мой груз */}
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
                        <p className={styles.count__number}>{countOfCargos.length}</p>
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
                  {t('my-transport')}
                  {/* Мой транспорт */}
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
                        <p className={styles.count__number}>{countOfTransports.length}</p>
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
          </>}
        {userWork === "Грузоотправитель" &&
          <section className={`${styles.block} ${styles.block__data} `}>
            <div className={styles.block__header}>
              <div className={styles.header_title}>
                {t('my-cargo')}
                {/* Мой груз */}
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
                      <p className={styles.count__number}>{countOfCargos.length}</p>
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
        }
        {userWork === "Перевозчик" &&
          <section className={`${styles.block} ${styles.block__data} ${styles.block__data2}`}>
            <div className={styles.block__header}>
              <div className={styles.header_title}>
                {t('my-transport')}
                {/* Мой транспорт */}
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
                      <p className={styles.count__number}>{countOfTransports.length}</p>
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
        }
        <section className={`${styles.block} ${styles.block__data} ${styles.data_reviews}`}>
          <div className={styles.block__header}>
            <div className={styles.header_title}>
              {t('reviews')}
              {/* Отзывы */}
            </div>
          </div>
          <div className={styles.block__content}>
            <div className={styles.content__inner}>
              <div className={styles.reviews}>
                <div className={styles.reviews__info}>
                  <p>Положительные</p>
                  <div className={styles.reviews_likes}>
                    <img className={styles.like_icon} src={like} alt="star" />
                    <span className={styles.like__count}>{likes}
                    </span>
                  </div>
                </div>
                <div className={styles.reviews__info}>
                  <p>Отрицательные</p>
                  <div className={styles.reviews_likes}>
                    <img className={styles.unlike_icon} src={like} alt="star" />
                    <span className={styles.like__count}>{dislikes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div >
  )
}

export default UserPage;