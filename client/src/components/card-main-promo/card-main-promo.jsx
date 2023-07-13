import styles from './card-main-promo.module.css'

export function CardMainPromo(props) {
  return (
    <div className={styles.card}   onClick={props.click}>
      <div className={styles.card__period}>{props.period}</div>
      <div className={styles.card__title}>{props.title}</div>
      <div className={`${styles.card__subtitle} ${styles.hidden}`}>{props.subtitle}</div>
    </div>
  )
}
export default CardMainPromo;