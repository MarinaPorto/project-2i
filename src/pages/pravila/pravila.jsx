
import styles from './pravila.module.css'
import {RulesItem} from './rules-item'


export function RulesPage() {
  return (
    <main className={styles.wrapper}>
      <div className="inner">
        <h2 className={`${styles.title}`} >Правила</h2>
        <RulesItem title="Пользовательское соглашение"/>

      </div>
    </main>
  )
}
export default RulesPage;