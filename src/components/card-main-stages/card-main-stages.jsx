import styles from './card-main-stages.module.css'

export function CardMainStages(props) {
  return (
    <div className={styles.card}>
      <div className={styles.card__title}>{props.title}</div>
      <div className={`${styles.card__subtitle} ${styles.hidden}`}>{props.subtitle}</div>
    </div>
  )
}
export default CardMainStages;