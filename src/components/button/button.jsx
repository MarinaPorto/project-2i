import styles from './button.module.css'

export function Button(props) {
  return (
    <div className={styles.btn} onClick={props.click}>
      {props.children}
    </div>
  )
}
export default Button;