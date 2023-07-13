import styles from './rules-item.module.css'

export function RulesItem(props) {
  return (
    <div className={`${styles.text}`}>
      <h3 className={`${styles.text_title}`}>{props.title}</h3>
    </div>
  )
}
export default RulesItem;