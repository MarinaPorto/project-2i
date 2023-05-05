import styles from './faq.module.css'
import { useState } from 'react';
import { block1, block2, block3 } from './faq-items';
import { FaqAccordion } from '../../components/faq-accordion';

export function FAQPage() {

  const [active, setActive] = useState(0);

  const openTab = (e) => {
    e.preventDefault()
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setActive(+e.target.dataset.index);
  };

  const TabContent = ({ content }) => (
    <div className="tabcontent">
      <p>{content}</p>
    </div>
  );
  const items = [
    { title: 'Учётная запись', info: 'Как пройти регистрацию на сайте, редактировать контактные данные', content: <FaqAccordion items={block1} /> },
    { title: 'Грузы и транспорт', info: 'Как добавить/обновить/удалить свои заявки на груз или транспорт.', content: <FaqAccordion items={block2} /> },
    { title: 'Услуги и оплаты', info: 'Как добавить/обновить/удалить свои заявки на груз или транспорт.', content: <FaqAccordion items={block3} /> },
  ];

  return (
    <main className={styles.wrapper}>
      <div className="inner">
        <h2 className={`${styles.title}`} >FAQ</h2>
        <div className="tab">
          {items.map((n, i) => (
            <div className="">
              <button key={i + 10}
                className={`tablinks ${i === active ? 'active' : ''}`}
                onClick={openTab}
                data-index={i}
              >
                <p className={styles.tab__title} data-index={i}>{n.title}</p>
                <p className={styles.tab__info} data-index={i}>{n.info}</p>
              </button>
              {document.documentElement.clientWidth <= 560 && i === active && <TabContent {...items[active]} />}
            </div>
          ))}
        </div>
        {document.documentElement.clientWidth > 560 && items[active] && <TabContent {...items[active]} />}
      </div>
    </main>
  )
}
export default FAQPage;