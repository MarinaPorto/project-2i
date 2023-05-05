import { FooterBottom } from '../footer-bottom';
import { FooterMenu } from '../footer-menu';
import styles from './footer.module.css';

export function Footer() {

  return (
    <footer className={styles.footer}>
      <FooterMenu />
      <FooterBottom />
    </footer>
  )
}

export default Footer;
