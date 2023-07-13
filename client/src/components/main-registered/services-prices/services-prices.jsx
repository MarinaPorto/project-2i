/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import styles from './services-prices.module.css';
import { openSelectedPage } from '../../../redux/reducers/selected-page-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { ModalSF } from '../../modal-sf';
import { ModalSuccess } from '../../modal-success';
import { addUserAccount } from '../../../http/userAPI';
import axios from "axios";
import { openSuccessModal } from '../../../redux/reducers/success-reducer';
import { saveUserData } from '../../../redux/reducers/user-data-reducer';

export function ServicesPrices() {
  const dispatch = useDispatch();
  const sfModal = useSelector(state => state.sfModal.sfModal);
  const successModal = useSelector(state => state.successModal.successModal);
  const userData = useSelector(state => state.userData.userData);
  const userId = useSelector(state => state.userData.userData.id);
  const [balance, setBalance] = useState([]);
  const [btnIsActive, setBtnIsActive] = useState(userData.period ? false : true);
  const [noticeSubscription, setNoticeSubscription] = useState("");
  function goToBalancePage() {
    dispatch(openSelectedPage("balancepage"))
  }

  async function getUserAccount() {
    try {
      const response = await axios.get(`http://178.172.173.84:5000/api/user/getaccount/${userId}`)
      setBalance(response.data)
      const user = await axios.get(`http://178.172.173.84:5000/api/user/data/${userId}`)
      dispatch(saveUserData(user.data));
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
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

  function timeParse(date) {
    let d = new Date(date);
    let hours = d.getHours() + 3;
    let minutes = d.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    getUserAccount()
    checkSubscription()
  }, []);


  const [responseStatus, setResponseStatus] = useState(null);

  const initialValues = {
    account: 10,
    userId: userId,
    date: new Date().toLocaleString(),
    email: userData.email,
    type: 'withdrawal',
  }

  const getSubscription = async (initialValues) => {
    if (userData.balance >= initialValues.account) {
      const response = await addUserAccount(initialValues)
      setResponseStatus(response.status);
      dispatch(openSuccessModal())
      getUserAccount()
      setBtnIsActive(false)
    } else {
      dispatch(openSuccessModal())
      setResponseStatus("err")
    }
  }

  const checkSubscription = async () => {
    if (userData.period) {
      let currentDate = new Date();
      let periodDate = new Date(userData.period);
      let dateForCheck = new Date(periodDate.setDate(periodDate.getDate() - 2));
      if (currentDate >= dateForCheck) {
        setBtnIsActive(true)
        setNoticeSubscription("Срок действия подписки подходит к концу")
      }
    }
  }

  return (
    <div className={styles.user_wrapper}>
      {sfModal && <ModalSF />}
      {(successModal && responseStatus === 200) && <ModalSuccess title="Успешно" text="Подписка оформлена" />}
      {(successModal && responseStatus === "err") && <ModalSuccess title="Ошибка" text="Недостаточно средств" />}
      <div className={styles.payment_data}>
        <div className={styles.user_data}>
          <section className={`${styles.block} ${styles.block__data} `}>
            <div className={styles.block__header}>
              <div className={styles.header_title}>
                Активные услуги
              </div>
            </div>
            <div className={styles.block__content}>
              <div className={styles.content__inner}>
                <ul className={styles.data_items}>
                  <li className={styles.data_item}>
                    <span>Бесплатный</span>
                    <span>Срок неограничен</span>
                  </li>
                </ul>
              </div>
              {userData.isPaid &&
                <>
                  <div className={styles.content__inner}>
                    <ul className={styles.data_items}>
                      <li className={styles.data_item}>
                        <span>Платная подписка</span>
                        <span>до {dateParse(userData.period)}</span>
                      </li>
                    </ul>
                  </div>
                  {noticeSubscription && <p className={styles.notice_subscription}>{noticeSubscription}</p>}
                </>
              }
            </div>
          </section>
          <section className={`${styles.block} ${styles.block__data} `}>
            <div className={styles.block__header}>
              <div className={styles.header_title}>
                Неактивные услуги
              </div>
            </div>
            <div className={styles.block__content}>
              <div className={styles.content__inner}>
                <ul className={styles.data_items}>
                  <li className={styles.data_item}>
                    <span>Платная подписка</span>
                    <span>Срок действия ограничен</span>
                  </li>
                </ul>
              </div>
              {btnIsActive ?
                <div className={styles.btn} onClick={() => getSubscription(initialValues)}>
                  Подключить подписку
                </div> :
                <div className={`${styles.btn} ${styles.btn_disable} `}>
                  Подключить подписку
                </div>
              }
            </div>
          </section>
        </div>
        <div className={styles.user_data}>
          <section className={`${styles.block} ${styles.block__data} `}>
            <div className={styles.block__header}>
              <div className={styles.header_title}>
                Баланс
              </div>
            </div>
            <div className={`${styles.block__content} ${styles.block__content_balance} `}>
              <div className={styles.content__inner_balance}>
                <p>Баланс на Вашем счёту:</p>
                <p className={styles.balance}>
                  {balance.length > 0 ? userData.balance : 0} бел. руб</p>
              </div>
              <div className={styles.btn} onClick={() => goToBalancePage()}>
                Пополнить баланс
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className={styles.payment}>
        <section className={`${styles.block} ${styles.block__data} `}>
          <div className={styles.block__header}>
            <div className={styles.header_title}>
              Оплаты
            </div>
          </div>
          <div className={`${styles.block__content} ${styles.block__content_payment} ${styles.block__content_border}`}>
            <div className={styles.payment_title}>Время</div>
            <div className={styles.payment_title}>Операция</div>
            <div className={styles.payment_title}>Сумма</div>
            <div className={styles.payment_title}>Остаток</div>
          </div>
          {
            balance.length > 0 ?
              balance.map((item, index) => {
                return (
                  <div className={`${styles.block__content} ${styles.block__content_payment} `} key={index + "acc"}>
                    <div className={styles.payment_text}>{dateParse(item.date)} {timeParse(item.date)}</div>
                    {item.type === "withdrawal" ?
                      <div className={styles.payment_text}>Снятие</div> :
                      <div className={styles.payment_text}>Пополнение</div>
                    }
                    <div className={styles.payment_text}>{item.account} бел.руб.</div>
                    <div className={styles.payment_text}>
                      {item.rest} бел.руб. </div>
                  </div>
                )
              }) : ""
          }
        </section>
      </div>
    </div >
  )
}
export default ServicesPrices;