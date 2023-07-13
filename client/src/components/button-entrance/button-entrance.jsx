import styles from './button-entrance.module.css'

export function ButtonEntrance(props) {
  return (
    <div className={styles.btnEntrance} onClick={props.click}>
      {props.children}
    </div>
  )
}
export default ButtonEntrance;