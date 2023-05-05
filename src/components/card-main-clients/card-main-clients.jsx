import styles from './card-main-clients.module.css'

export function CardMainClients(props) {
  return (
    <div className={styles.card}>
     <img src={props.img} alt="logo" />
     <div className={styles.name}>{props.text}</div>

    </div>
  )
}
export default CardMainClients;