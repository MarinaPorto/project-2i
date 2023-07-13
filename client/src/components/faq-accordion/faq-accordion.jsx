import styles from './faq-accordion.module.css';
// import styles from './faq-accordion-pers.module.css';
import * as React from 'react';
import { useState } from 'react';

export function FaqAccordion(props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  return (
    <div className={styles.ac_wrapper}>
      {props.items.map((item, index) => (
        <div key={item.title} className={styles.item_wrapper}>
          <button className={`faq__head ${index === activeIndex ? 'active' : ''}`} onClick={() => handleClick(index)}>{item.title}</button>
          {index === activeIndex && item.content.map((el) => {
            return <p className={styles.text}>{el}</p>
          })}
        </div>
      ))}
    </div>
  )
}
export default FaqAccordion;