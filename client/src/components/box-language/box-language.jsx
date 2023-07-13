import styles from './box-language.module.css'
import rus from './images/rus.jpg'
import eng from './images/eng.jpg';
import per from './images/per.jpg';
import arrow from './images/arrow.svg';
import { useState } from 'react';
import cookies from 'js-cookie'
import { useTranslation } from "react-i18next";
import i18next from 'i18next'

export function BoxLanguage() {
  const [isOpenlang, setIsOpenLang] = useState(false);

  function changeLangWindow() {
    if (!isOpenlang) {
      setIsOpenLang(true)
    } else {
      setIsOpenLang(false)
    }
  }

  const currentLanguageCode = cookies.get('i18next') || 'en'

  return (
    <div className={styles.boxWrapper}>
      <div className={styles.mainLang}>
        {currentLanguageCode === 'ru' && <img src={rus} alt="rus" className={styles.box_img} />}
        {currentLanguageCode === 'en' && <img src={eng} alt="eng" className={styles.box_img} />}

        {/* <img src={rus} alt="rus" className={styles.box_img} /> */}
        <div className={styles.arrow} onClick={changeLangWindow} >
          <img src={arrow} alt="lang" className={styles.box_arrow} />
        </div>
      </div>
      <div className={isOpenlang ? `${styles.langList}` : `${styles.langListNone}`}>
        <img src={rus} alt="rus" onClick={() => {
          i18next.changeLanguage('ru')
          changeLangWindow()
        }} />
        <img src={eng} alt="eng" onClick={() => {
          i18next.changeLanguage('en')
          changeLangWindow()
        }} />
        <img src={per} alt="per" />
      </div>

    </div>
  )

}
export default BoxLanguage;
