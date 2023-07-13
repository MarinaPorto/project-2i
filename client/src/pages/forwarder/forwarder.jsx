
import styles from './forwarder.module.css'
import { PagesDescription } from '../../components/pages-description';
import boxes from "./images/img.png"
import tableSearch from "./images/table1.png"
import tableReg from "./images/table2.png"
import { PagesItem } from '../../components/pages-item';
import { useEffect } from 'react';

export function ForwarderPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.wrapper}>
      <div className="inner">
        <PagesDescription title="Экспедитору"
          text="IrisTrans.com предоставляет возможность эффективно вести экспедиторскую деятельность. Используйте инструменты поиска транспорта и груза, добавления груза."
          img={boxes} />
        <PagesItem title="Поиск транспорта и груза"
          text="IrisTrans.com имеет универсальный инструмент по поиску транспорта и груза, широкий выбор параметров позволяет отбирать самые выгодные предложения именно для Вас."
          img={tableSearch} />
        <PagesItem title="Регистрация транспорта и груза"
          text="Зарегистрируйте ваш транспорт на IrisTrans.com с требованием для перевозки. С помощью данного инструмента вы сможете с лёгкостью зарегистрировать свой груз на IrisTrans.com."
          img={tableReg} />
      </div>
    </main>
  )
}
export default ForwarderPage;