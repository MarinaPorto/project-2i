import styles from './main-tariff.module.css';
import { NavLink } from 'react-router-dom';
import Button from '../button/button';
import CardMainTariff from '../card-main-tariff/card-main-tariff';
import auto from './images/auto.png';
import autoMob from './images/auto-mob.png';
import boxes from './images/boxes.png';
import man from './images/man.png';

export function MainTariff() {
  return (
    <div className={styles.tariff_wrapper}>
      <div className="inner">
        <h2 className={`${styles.title} section__title `} >Тарифы</h2>

        <div className={styles.cards__wrapper}>
          <div className={styles.img_full}>
            <CardMainTariff title="ДЛЯ ПЕРЕВОЗЧИКА"
              subtitle="Поиск груза, регистрация транспорта"
              img={auto} />
          </div>
          <div className={styles.img_mob} >  
           <CardMainTariff title="ДЛЯ ЭКСПЕДИТОРА"
            subtitle={'Поиск груза и транспорта, \n регистрация груза и транспорта'}
            img={autoMob} />
        </div>

        <CardMainTariff title="ДЛЯ ГРУЗООТПРАВИТЕЛЯ"
          subtitle="Поиск транспорта, регистрация груза"
          img={boxes} />
        <CardMainTariff title="ДЛЯ ЭКСПЕДИТОРА"
          subtitle={'Поиск груза и транспорта, \n регистрация груза и транспорта'}
          img={man} />


      </div>
      <NavLink to="/tariff" key='logo' >
       <Button>Пакеты услуг</Button>
      </NavLink>
    
    </div>

    </div >
  )
}
export default MainTariff;