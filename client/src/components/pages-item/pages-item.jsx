import styles from './pages-item.module.css';
// import styles from './pages-item-pers.module.css';

export function PagesItem(props) {
  return (
    <div className={styles.desc__wrapper}>
      <h2 className={`${styles.title}`} >{props.title}</h2>
      <div className={styles.desc__info}>
        <p className={styles.text}>{props.text}</p>
      </div>
      <img className={styles.img} src={props.img} alt="auto" />
    </div>
  )
}
export default PagesItem;