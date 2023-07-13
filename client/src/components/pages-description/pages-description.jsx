// import styles from './pages-description-pers.module.css';
import styles from './pages-description.module.css';
import { useDispatch } from 'react-redux';
import Button from '../button/button';
import { openRegistrForm } from '../../redux/reducers/registration-reducer';


export function PagesDescription(props) {
  const dispatch = useDispatch();

  function changeRegistrationOpen() {
    dispatch(openRegistrForm());
  }

  return (
    <div className={styles.desc__wrapper}>
      <h2 className={`${styles.title}`} >{props.title}</h2>
      <div className={styles.desc__info}>
        <p className={styles.text}>{props.text}</p>
        <Button click={changeRegistrationOpen}>Регистрация</Button>
      </div>
      <img className={styles.img} src={props.img} alt="auto" />
    </div>
  )
}
export default PagesDescription;