
import styles from './сarrier.module.css'
import { PagesDescription } from '../../components/pages-description';
import auto from "./images/auto.png"
import tableSearch from "./images/table1.png"
import tableReg from "./images/table2.png"
import { PagesItem } from '../../components/pages-item';
import { useEffect } from 'react';

export function CarrierPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.wrapper}>
      <div className="inner">
        <PagesDescription title="Перевозчику"
          text="IrisTrans.com предоставляет набор решений для эффективного управления транспортом, быстрого поиска груза по интересующим направлениям и параметрам."
          img={auto} />
        <PagesItem title="Поиск груза для перевозки"
          text="IrisTrans.com имеет универсальный инструмент по поиску груза, широкий выбор параметров позволяет отбирать самые выгодные предложения именно для Вас."
          img={tableSearch} />
        <PagesItem title="Регистрация транспорта"
          text="С помощью данного инструмента вы сможете с лёгкостью зарегистрировать свой транспорт на IrisTrans.com. Это позволит вам получать предложения от грузоотправителей."
          img={tableReg} />
      </div>
    </main>
  )
}
export default CarrierPage;