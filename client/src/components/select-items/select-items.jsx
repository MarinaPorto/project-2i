import styles from './select-items.module.css';
import { useState } from 'react';

export function SelectItems(props) {

  const [value, setValue] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  function handleChange(value) {
    setValue(value)
    setIsSelectOpen(false)
  }



  return (

    <div className={styles.select_box}>
      <div className="">
        <input type="text" defaultValue={value} className={styles.select_menu} onClick={() => setIsSelectOpen(!isSelectOpen)} placeholder={props.placehold}  />
        {isSelectOpen && <ul className={styles.select_items_left}>
          {props.itemList.map((option) => (
            <li className={styles.select_item} value={option.value} onClick={() => handleChange(option.value)}>{option.label}</li>
          ))}
        </ul>}
      </div>
    </div>

  )
}
export default SelectItems;