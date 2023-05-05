import styles from './footer-bottom-copyright.module.css';

export function FooterCopyrightLine() {

  return (
    <div className={styles.footerLine}>
      <div className={styles.footerText1}>Copyright IrisTrans.com © 2023</div>
      <div className={styles.footerText2}>Сайт разработан ВТОП3</div>

    </div>
  )
}

export default FooterCopyrightLine;
