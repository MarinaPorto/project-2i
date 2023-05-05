import styles from './box-language.module.css'
import rus from './images/rus.jpg'
import eng from './images/eng.jpg';
import per from './images/per.jpg';
import arrow from './images/arrow.svg';
import { useState } from 'react';

export function BoxLanguage() {
  const [isOpenlang, setIsOpenLang] = useState(false);

  function changeLangWindow() {
    if (!isOpenlang) {
      setIsOpenLang(true)
    } else {
      setIsOpenLang(false)
    }
  }

  return (
    <div className={styles.boxWrapper}>
      <div className={styles.mainLang}>
        <img src={rus} alt="rus" className={styles.box_img} />
        <div className={styles.arrow} onClick={changeLangWindow} >
          <img src={arrow} alt="lang" className={styles.box_arrow} />
        </div>
      </div>
      <div className={isOpenlang ? `${styles.langList}` : `${styles.langListNone}`}>
        <img src={rus} alt="rus" />
        <img src={eng} alt="eng" />
        <img src={per} alt="per" />
      </div>

    </div>
  )

}
export default BoxLanguage;
