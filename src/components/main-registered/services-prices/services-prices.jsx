import styles from './services-prices.module.css';
import { openSelectedPage } from '../../../redux/reducers/selected-page-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { openSFModal } from '../../../redux/reducers/sf-reducer';
import { ModalSF } from '../../modal-sf'

export function ServicesPrices() {
  const dispatch = useDispatch();
  const sfModal = useSelector(state => state.sfModal.sfModal);

  function goToBalancePage() {
    dispatch(openSelectedPage("balancepage"))
  }

  return (
    <div className={styles.user_wrapper}>
      {sfModal && <ModalSF />}
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
              <div className={styles.btn} onClick={() => dispatch(openSFModal())}>
                Запросить счёт-фактуру
              </div>
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
                <p className={styles.balance}>0 бел. руб</p>
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
          <div className={`${styles.block__content} ${styles.block__content_payment} `}>
            <div className={styles.payment_text}>01.04.2023 00:00</div>
            <div className={styles.payment_text}>Баланс создан</div>
            <div className={styles.payment_text}>0 бел.руб.</div>
            <div className={styles.payment_text}>0 бел.руб.</div>
          </div>
        </section>
      </div>
    </div >
  )
}
export default ServicesPrices;