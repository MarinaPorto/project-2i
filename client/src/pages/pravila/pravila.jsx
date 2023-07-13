import { Agreement } from './agreement';
import styles from './pravila.module.css'

export function RulesPage() {
  return (
    <main className={styles.wrapper}>
      <div className="inner">
         <Agreement />

      </div>
    </main>
  )
}
export default RulesPage;