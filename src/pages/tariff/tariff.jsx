
import styles from './tariff.module.css'
import icon from "./images/icon-attention.png"



export function TariffPage() {
  return (
    <main className={styles.wrapper}>
      <div className="inner">
        <h2 className={`${styles.title}`} >Тарифы</h2>
        <div className={styles.notice__card}>

          <div className={styles.notice__title}>
            <img src={icon} alt="attention-icon" />
            <span> Внимание!</span>

          </div>
          <div className={styles.notice__text}>
          В честь открытия сайта «iristrans.com» все тарифы бесплатны в течение 3 месяцев.
          </div>



        </div>


      </div>
    </main>
  )
}
export default TariffPage;