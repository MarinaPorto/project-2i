import styles from './main-stages.module.css';
// import styles from './main-stages-pers.module.css';
import Button from '../button/button';
import CardMainStage from '../card-main-stages/card-main-stages';
import { useDispatch } from 'react-redux';
import { openRegistrForm } from '../../redux/reducers/registration-reducer';

export function MainStages() {

  const dispatch = useDispatch();

  function changeRegistrationOpen() {
    dispatch(openRegistrForm());
  }

  return (
    <div className={styles.main__stages_wrapper}>
      <div className="inner">
        <h2 className={`${styles.title} section__title `} >Этапы работы с сайтом</h2>
        <div className={styles.cards__wrapper}>
          <CardMainStage title="1. Регистрация"
            subtitle="Заполните форму регистрации. Это займёт всего пару минут." />
          <CardMainStage title="2. Подтверждение компании"
            subtitle="Пройдите процедуру проверки компании." />
          <CardMainStage title="3. Выбор пакета услуг"
            subtitle="Подключите пакет услуг, который соответствует вашим требованиям и пополните баланс." />
          <CardMainStage title="4. Готово"
            subtitle="Можете пользоваться платформой IrisTrans.com для поиска груза и транспорта. Описание всех возможностей в разделе FAQ." />
        </div>
        <Button click={changeRegistrationOpen}>Регистрация</Button>
      </div>
    </div>
  )
}
export default MainStages;