
import styles from './shipper.module.css'
import { PagesDescription } from '../../components/pages-description';
import boxes from "./images/boxes.png"
import tableSearch from "./images/table1.png"
import tableReg from "./images/table2.png"
import { PagesItem } from '../../components/pages-item';
import { useEffect } from 'react';

export function ShipperPage() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.wrapper}>
      <div className="inner">
        <PagesDescription title="Грузоотправителю"
          text="Грузоотправителю IrisTrans.com предоставляет возможность эффективно вести деятельность в сфере грузоперевозок с помощью инструментов поиска транспорта и добавления груза."
          img={boxes} />
        <PagesItem title="Поиск транспорта"
          text="IrisTrans.com имеет универсальный инструмент по поиску транспорта, широкий выбор параметров позволяет отбирать самые выгодные предложения именно для Вас."
          img={tableSearch} />
        <PagesItem title="Регистрация груза"
          text="С помощью данного инструмента вы сможете с лёгкостью зарегистрировать свой груз на IrisTrans.com."
          img={tableReg} />
      </div>
    </main>
  )
}
export default ShipperPage;