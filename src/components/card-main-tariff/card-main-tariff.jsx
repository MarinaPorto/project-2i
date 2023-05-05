import styles from './card-main-tariff.module.css'

export function CardMainTariff(props) {
  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <div className={styles.card__title}>{props.title}</div>
        <div className={`${styles.card__subtitle} ${styles.hidden}`}>{props.subtitle}</div>
      </div>
      <div className={styles.card__img}>
        <img src={props.img} alt="" />
      </div>
    </div>
  )
}
export default CardMainTariff;