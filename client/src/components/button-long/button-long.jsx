import styles from './button-long.module.css'

export function ButtonLong(props) {
  return (
    <div className={styles.btn}>
      {props.children}
    </div>
  )

}
export default ButtonLong;