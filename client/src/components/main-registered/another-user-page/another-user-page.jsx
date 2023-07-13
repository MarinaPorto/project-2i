/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import styles from './another-user-page.module.css';
import parcel from "./images/parcel.svg";
import truck2 from "./images/truck2.svg";
import star from "./images/star.svg";
import starbl from "./images/star-black.svg";
import nologo from "./images/no-logo.jpg";
import like from "./images/like.svg";
import likebl from "./images/like-black.svg";
import staractive from "./images/star-active.svg";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { activationUser, deleteUser, addUserAccount, uploadInvoice } from '../../../http/userAPI'
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { openEditAccountForm } from '../../../redux/reducers/edit-account-reducer';
import AccountUpdate from '../update-account/update-account';
import { useFormik } from 'formik';
import { openRegFinishModal } from '../../../redux/reducers/registration-finish';
import { openSuccessModal } from '../../../redux/reducers/success-reducer';
import { ModalSuccess } from '../../modal-success';
import { useRef } from 'react';
import { openSelectedPage } from '../../../redux/reducers/selected-page-reducer';


export function AnotherUserPage({ onlineUsers }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.userData);
  const selectedUser = useSelector(state => state.currentSelectedUser.currentSelectedUser);
  const [onlineUser] = useState(onlineUsers);
  const userIsOnline = onlineUser && onlineUser.some(user => user.userId === userData.id);
  const inputRef = useRef(null);

  let variable = {
    likesSenderId: userData.id,
    likesRecipientId: selectedUser.id
  }

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);
  const [selectedUserStatus, setSelectedUserStatus] = useState(selectedUser.isActivated);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [file, setFile] = useState(null);
  const [fileResponse, setFileResponse] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const successModal = useSelector(state => state.successModal.successModal);

  const selectFile = e => {
    setFile(e.target.files[0])
  }


  async function getLikes() {
    try {
      const response = await axios.post('http://178.172.173.84:5000/api/user/like', variable)
      setLikes(response.data.length)
      if (response.data.length > 0) {
        response.data.map(like => {
          if (like.likesSenderId === userData.id) {
            setLikeAction("liked")
          }
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
        response.data.map(dislike => {
          if (dislike.likesSenderId === userData.id) {
            setDislikeAction("disliked")
          }
        })
      }
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  useEffect(() => {
    getLikes();
    getDislikes();
  }, []
  )

  const countOfCargos = useSelector(state => state.cargoUsers.cargoUser);
  const countOfTransports = useSelector(state => state.transportsUser.transportsUser);
  const userLogo = useSelector(state => state.currentImg.currentImg);
  const userWork = useSelector(state => state.userData.userData.work);
  let avatar = selectedUser.img ? `http://178.172.173.84:5000/avatars/${selectedUser.img}` : nologo;
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

  const onLike = async () => {
    if (likeAction === null) {
      const response = await axios.post('http://178.172.173.84:5000/api/user/upLike', variable)
      setLikes(likes + 1)
      setLikeAction("liked")
      if (dislikeAction !== null) {
        setDislikeAction(null)
        setDislikes(dislikes - 1)
      }
      return response
    } else {
      const response = await axios.post('http://178.172.173.84:5000/api/user/unLike', variable)
      setLikeAction(null)
      setLikes(likes - 1)
      return response
    }
  }
  const onDislike = async () => {
    if (dislikeAction !== null) {
      const response = await axios.post('http://178.172.173.84:5000/api/user/unDisLike', variable)
      setDislikeAction(null)
      setDislikes(dislikes - 1)
      return response

    } else {
      const response = await axios.post('http://178.172.173.84:5000/api/user/upDislike', variable)
      setDislikeAction("disliked")
      setDislikes(dislikes + 1)
      if (likeAction !== null) {
        setLikes(likes - 1)
        setLikeAction(null)
      }
      return response
    }
  }

  const activationUserProfile = async (values) => {
    await activationUser(values)
    setSelectedUserStatus(true)

  }
  const deleteUserProfile = async (values) => {
    setDeleteStatus(true)
    const response = await deleteUser(values)
    if (response.statusText === "OK") {
      setDeleteResponse(response.statusText)
      dispatch(openSuccessModal())
      setTimeout(() => {
        dispatch(openSelectedPage("userspage"))
      }, 2000);
    } else {
      dispatch(openSuccessModal())
      setDeleteResponse('err')
    }
  }

  const editForm = useSelector(state => state.editAccountForm.editAccountForm);
  const initialValues = {
    userId: selectedUser.id,
    email: selectedUser.email,
  }
  const formData = new FormData();
  const onSubmit = async (values) => {
    if (file === null) {
      return
    } else {
      formData.append('file', file)
      formData.append('userId', values.userId)
      formData.append('email', values.email)
      const response = await uploadInvoice(formData);
      setFileResponse(response.data)
      if (response.data === "OK") {
        setFile(null)
        setFileResponse(response.data)
        dispatch(openSuccessModal())
      } else {
        dispatch(openSuccessModal())
        setFileResponse('err')
      }
      inputRef.current.value = null;
    }
  }
  const formik = useFormik({
    initialValues,
    onSubmit,

  })
  return (
    <>
      {(successModal && fileResponse === "OK") && <ModalSuccess title="Успешно" text="Счет-фактура отправлен" />}
      {(successModal && fileResponse === "err") && <ModalSuccess title="Ошибка" text="Счет-фактура  не отправлен" />}
      {(successModal && deleteResponse === "OK") && <ModalSuccess title="Успешно" text="Пользователь удален" />}
      {(successModal && deleteResponse === "err") && <ModalSuccess title="Ошибка" text="Пользователь не удален" />}
      <div className={styles.user_wrapper}>

        <section className={`${styles.block} ${styles.block__profile} `}>
          <div className={styles.block__header}>
            <div className={styles.user_name_header}>
              {(selectedUser.role === "Юридическое лицо") ? `${selectedUser.orgname}` : `${selectedUser.surname} ${selectedUser.name} ${selectedUser.secondname}`}
            </div>
            {(selectedUser.isActivated || selectedUserStatus) ?
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
                <img className={styles.user__logo} src={userLogo ? userLogo : avatar} alt="logo" />
              </div>
              <div className={styles.user_info}>
                <p className={styles.user_name}>{(selectedUser.role === "Юридическое лицо") ? `${selectedUser.orgname}` : `${selectedUser.surname} ${selectedUser.name} ${selectedUser.secondname}`}</p>
                <p className={styles.user_city}> {`${selectedUser.city}, ${selectedUser.country} `}</p>
                <div className={styles.user_grade}>
                  <div className={styles.user_stars}>
                    <span className={styles.stars__count}>0</span>
                    <img className={styles.star_icon} src={starbl} alt="star" />
                  </div>
                  <div className={styles.user_likes}>
                    <div className={styles.likes}>
                      <img className={styles.like_icon} src={likebl} alt="star" onClick={onLike} />
                      <span className={styles.like__count}>{likes}</span>
                    </div>
                    <div className={styles.likes}>
                      <img className={styles.unlike_icon} src={likebl} alt="star" onClick={onDislike} />
                      <span className={styles.unlike__count}>{dislikes}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.user_grade}>
                  {(userData.role === "Admin" && !deleteStatus) &&
                    <>
                      <div className={`${styles.user_likes}  ${styles.user_btn_general}`}>
                        <div className={styles.likes} >
                          <NavLink to={`http://178.172.173.84:5000/docs/${selectedUser.verification}`} target="_blank">
                            Открыть документы
                          </NavLink>
                        </div>
                      </div>
                      <div className={`${styles.user_likes}  ${styles.user_btn_general}`}>
                        <div className={styles.likes} onClick={() => {
                          dispatch(openEditAccountForm())
                        }}>
                          Пополнить счет
                        </div>
                      </div>
                      {editForm && <AccountUpdate userId={selectedUser.id} email={selectedUser.email} />}
                      {(selectedUser.isActivated || selectedUserStatus) ?
                        <div className={`${styles.user_likes} ${styles.user_btn_confirm}`}>
                          <div className={styles.likes}>
                            Профиль подтвержден
                          </div>
                        </div> :
                        <div className={`${styles.user_likes} ${styles.user_btn_confirm}`}>
                          <div className={styles.likes} onClick={() => { activationUserProfile({ userId: selectedUser.id }) }}>
                            Подвердить профиль
                          </div>
                        </div>
                      }
                      <div className={`${styles.user_likes} ${styles.user_btn_delete}`}>
                        <div className={styles.likes} onClick={() => { deleteUserProfile({ userId: selectedUser.id }) }}>
                          Удалить профиль
                        </div>
                      </div>
                    </>
                  }
                  {(userData.role === "Admin" && deleteStatus) &&
                    <div className={`$${styles.user_btn_deleted}`}>
                      <div className={styles.likes} >
                        Профиль удален
                      </div>
                    </div>
                  }
                </div>
                {userData.role === "Admin" &&
                  <div className={`${styles.user_grade} ${styles.input_verification}`}>
                    <form onSubmit={formik.handleSubmit}>
                      <label className={styles.input_label} htmlFor="invoice">Отправить счет-фактуру</label>
                      <input className={`${styles.input} ${styles.input_verification}`} ref={inputRef} type="file" id="invoice" name="invoice" onChange={selectFile} placeholder="Выберите файл" />
                      <button type="submit" className={styles.button_long} >Отправить</button>
                    </form>
                  </div>
                }
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
                    {selectedUser.role === "Юридическое лицо" ? <span> {`${selectedUser.orgname}, ${selectedUser.role}`}</span> : <span> {`${selectedUser.surname} ${selectedUser.name} ${selectedUser.secondname}, ${selectedUser.role}`}</span>}
                  </li>
                  {(selectedUser.role === "Юридическое лицо") && <li className={styles.data_item}>
                    <span>УНП</span>
                    {(selectedUser.role === "Юридическое лицо") && <span> {`${selectedUser.unp}`}</span>}
                  </li>}
                  <li className={styles.data_item}>
                    <span>Страна</span>
                    <span> {`${selectedUser.country} `}</span>
                  </li>
                  <li className={styles.data_item}>
                    <span>Город</span>
                    <span> {`${selectedUser.city}`}</span>
                  </li>
                  <li className={styles.data_item}>
                    <span>Дата регистрации</span>
                    <span>{dateParse(selectedUser.createdAt)}</span>
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
            </div>
            <div className={styles.block__content}>
              <div className={styles.content__inner}>
                <ul className={styles.data_items}>
                  {(selectedUser.role === "Юридическое лицо") && <li className={styles.data_item}>
                    <span>Контактное лицо</span>
                    {(selectedUser.role === "Юридическое лицо") && <span> {`${selectedUser.name}`}</span>}
                  </li>}
                  <li className={styles.data_item}>
                    <span>Телефон</span>
                    <span> {`${selectedUser.number}`}</span>
                  </li>
                  <li className={styles.data_item}>
                    <span>Email</span>
                    <span>{`${selectedUser.email}`}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        <div className={userStat}>
          {(userWork === "Экспедитор" || userWork === "Admin") &&
            <>
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
    </>
  )
}

export default AnotherUserPage;