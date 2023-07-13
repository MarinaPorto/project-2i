import styles from './payment.module.css'
// import styles from './payment-pers.module.css'
import logo1 from "./images/logo1.png"
import logo2 from "./images/logo2.png"
import logo3 from "./images/logo3.png"
import { CardPayment } from '../../components/card-payment';
import { useEffect } from 'react';

export function PaymentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.wrapper}>
      <div className="inner">
        <h2 className={`${styles.title}`} >Оплата</h2>
        <div className={styles.notice__text}>
          Для покупки тарифа для полного доступа на сайте и пополнения баланса  необходимо запросить счёт-фактуру на оплату в личном кабинете.
        </div>
        <div className={styles.cards}>
          <CardPayment title="PayPal"
            text="это быстрый и безопасный способ отправки и получения платежей без раскрытия сведений банковских карт."
            img={logo1} />
          <CardPayment title="tether"
            text="Является одним из способов оплаты, оплата может быть произведена через криптовалюту. В настоящее время мир движется к криптовалюте. Каждая единица Tether равна одному доллару. Для оплаты через Tether —  вы можете перевести необходимую сумму со своего цифрового кошелька (wallet) на цифровой кошелек  компании. Без комиссии и быстро.
            "
            img={logo2} />
          <CardPayment title="SHAPARAK"
            text='Для оплаты внутри сети в Иране. Клиенты, которые хотят произвести оплату через систему "SHAPARAK”, могут выбрать этот товар и произвести оплату в риалах через банковский портал.'
            img={logo3} />
        </div>
      </div>
    </main>
  )
}
export default PaymentPage;