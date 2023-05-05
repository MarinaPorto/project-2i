import styles from './card-payment.module.css';

export function CardPayment(props) {
  return (
    <div className={styles.card__wrapper}>
      <div className={styles.card__logo}>
        <img className={styles.img} src={props.img} alt="logo" />
      </div>
      <div className={styles.card__info}>
        <p className={styles.title}>{props.title}</p>
        <p className={styles.text}>{props.text}</p>
      </div>
    </div>
  )
}
export default CardPayment