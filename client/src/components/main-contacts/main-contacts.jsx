import styles from './main-contacts.module.css';
// import styles from './main-contacts-pers.module.css';


export function MainContacts() {
  return (
    <div className={styles.contacts_wrapper}>
      <div className="inner">
        <h2 className={`${styles.title} section__title`}>Контакты</h2>
        <div className={styles.contacts_items}>
          <div className={styles.contacts_item1}>
            <h4 className={styles.item_title}>Реквизиты</h4>
            <p className={styles.item_text}>Общество с ограниченной ответственностью «ИрИс Интер ГРУПП»
              <br />УНП: 193438125</p>
            <h4 className={styles.item_title}>Адреса</h4>
            <p className={styles.item_text}>Юридический адрес: Республика Беларусь, г. Минск, <br /> ул. Краснозвёздная, д. 18б, офис 701</p>
            <p className={styles.item_text}>Почтовый адрес: 220034, Республика Беларусь, г. Минск, <br /> а/я 15</p>
          </div>
          <div className={styles.contacts_item2}>
            <h4 className={styles.item_title}>Контакты</h4>
            <ul className={styles.contacts_list}>
              <li className={styles.list__item}>Офис: +375 (17) 303–96–99</li>
              <li className={styles.list__item}>По общим вопросам:+375 (29) 653–04–30</li>
              <li className={styles.list__item}>Специалист по странам Европы: +375 (29) 844–41–71</li>
              <li className={styles.list__item}>Индия, Турция, Малайзия, Китай: +375 (29) 620–63–07</li>
              <li className={styles.list__item}>Электронная почта: irisintergrupp@mail.ru</li>
            </ul>
          </div>
          <div className={styles.contacts_item3}>
            <h4 className={styles.item_title}>Банковские реквизиты:</h4>
            <ul className={styles.contacts_list}>
              <li className={styles.list__item}>IBAN: BY66 BPSB 3012 3269 1601 2933 0000 (USD),</li>
              <li className={styles.list__item}>IBAN: BY62 BPSB 3012 3269 1603 8840 0000 (BYN),</li>
              <li className={styles.list__item}>IBAN: BY45 BPSB 3012 3269 1604 1978 0000 (EUR),</li>
              <li className={styles.list__item}>IBAN: BY66 BPSB 3012 3269 1605 4643 0000 (RUB)</li>
              <li className={styles.list__item}>ОАО «СберБанк» г. Минск, б-р Мулявина, 6, BIC SWIFT BPSBBY2X</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainContacts;