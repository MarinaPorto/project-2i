import styles from './card-main-top.module.css'

export function CardMainTop(props) {
  return (
    <div className={styles.card}>
      <div className={styles.card__name}>
        <div className={styles.card__header}>
          <div className={styles.card__icon}>
            <img src={props.img} alt="icon" />
          </div>
          <div className={styles.card__header_text}>
            <div className={styles.card__title}>{props.title}</div>
            <div className={`${styles.card__subtitle} ${styles.hidden}`}>{props.subtitle}</div>
          </div>
        </div>
        <div className={`${styles.card__subtitle} ${styles.block}`}>{props.subtitle}</div>
      </div>
    </div>
  )
}
export default CardMainTop;