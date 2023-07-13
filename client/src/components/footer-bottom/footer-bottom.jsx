import { FooterCopyrightLine } from '../footer-bottom-copyright';
import { NavLink } from 'react-router-dom';
import styles from './footer-bottom.module.css';
// import styles from './footer-bottom-pers.module.css';
import paypal from './images/paypal-logo.png';
import tether from './images/tether-logo.png';
import lines from './images/3-logo.png';
import { ReactComponent as Inst } from "./images/social/inst.svg";
import { ReactComponent as Fb } from "./images/social/fb.svg";
import { ReactComponent as Tg } from "./images/social/tg.svg";
import { ReactComponent as Tw } from "./images/social/tw.svg";
import { ReactComponent as In } from "./images/social/in.svg";

export function FooterBottom() {

  return (
    <div className={styles.footerBottom}>
      <div className="inner">
        <p className={styles.info__visible}>Юр. информация: ООО «ИрИс Интер ГРУПП», УНП: 193438125,
          Адрес: Республика Беларусь, г. Минск, ул. Краснозвёздная, д. 18б, офис 701</p>
        <div className={styles.bottomInner}>
          <div className={styles.footerLogo}>
            <img className={styles.logo1} src={paypal} alt="paypal" />
            <img className={styles.logo2} src={tether} alt="tether" />
            <img className={styles.logo3} src={lines} alt="lines" />
          </div>
          <div className={styles.footerSocial}>
            <NavLink to="https://www.instagram.com/iris_inter_group/?igshid=YmMyMTA2M2Y%3D" target="_blank">
              <Inst className={styles.socialIcon} />
            </NavLink>
            <NavLink to="https://www.facebook.com/profile.php?id=100066824791698" target="_blank">
              <Fb className={styles.socialIcon} />
            </NavLink>
            <NavLink to="https://t.me/+oqJsXkm8C0Y2YzRi" target="_blank">
              <Tg className={styles.socialIcon} />
            </NavLink>
            <NavLink to="https://twitter.com/IrisTrans_com" target="_blank">
              <Tw className={styles.socialIcon} />
            </NavLink>
            <NavLink to="https://www.linkedin.com/in/iristrans-com-081521272/" target="_blank">
              <In className={styles.socialIcon} />
            </NavLink>
          </div>
        </div>
        <FooterCopyrightLine />
      </div>
    </div>
  )
}

export default FooterBottom;