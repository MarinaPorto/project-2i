import styles from './home-balance.module.css';
import stylesU from '../user-page/user-page.module.css';

import logo1 from "./images/logo1.png"
import logo2 from "./images/logo2.png"
import logo3 from "./images/logo3.png"

import icon from "./images/icon-attention.png"
import { useSelector, useDispatch } from 'react-redux';
import { openSFModal } from '../../../redux/reducers/sf-reducer';
import { ModalSF } from '../../modal-sf'


export function BalancePage() {

  const dispatch = useDispatch();
  const sfModal = useSelector(state => state.sfModal.sfModal);
  return (
    <div className={styles.home_wrapper}>
      {sfModal && <ModalSF />}
      <div className={styles.home_items}>
        <div className={styles.notice__card}>
          <div className={styles.notice__title}>
            <img src={icon} alt="attention-icon" />
            <span> Внимание!</span>
          </div>
          <div className={styles.notice__text}>
            Для покупки тарифа для полного доступа на сайте и пополнения баланса необходимо запросить счёт-фактуру на оплату
          </div>
          <div className={styles.notice__items}>
            <div className={styles.notice__item}>
              <div className={styles.btn} onClick={() => dispatch(openSFModal())}>
                Запросить счёт-фактуру
              </div>
            </div>
          </div>
        </div>
        <section className={`${stylesU.block} ${stylesU.block__data} ${styles.block__items}`}>
          <div className={stylesU.block__header}>
            <div className={styles.header__title}>
              Способы оплаты
            </div>

          </div>
          <div className={`${stylesU.block__content} ${styles.content}`}>
            <div className={stylesU.content__inner}>

              <div className={styles.payment__items}>
                <div className={styles.payment__item}>
                  <img src={logo1} alt="logo" />
                </div>
                <div className={styles.payment__item}>
                  <img src={logo2} alt="logo" />
                </div>
                <div className={styles.payment__item}>
                  <img src={logo3} alt="logo" />
                </div>

              </div>

            </div>
          </div>
        </section>
      </div>
    </div >
  )
}
export default BalancePage;