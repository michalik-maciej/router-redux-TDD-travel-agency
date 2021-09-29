import React from "react";

import { formatPrice } from "../../../utils/formatPrice";
import styles from './OrderOption.module.scss';

const newValueSet = (currentValue, id, checked) => {
  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value !== id);
  }
};

const OrderOptionCheckboxes = ({currentValue, values, setOptionValue}) => (
  <div className={styles.checkboxes}>
    {values.map( value => (
      <label
        className={styles.icon}
        key={value.id}
      >
        {value.name}
        ({formatPrice(value.price)})
        <input 
          type='checkbox'
          value={value.id}
          checked={currentValue.includes(value.id) ? true : false}
          onChange={event => setOptionValue(newValueSet(currentValue, value.id, event.currentTarget.checked))}
        />          
      </label>
    ))}
  </div>
);

export default OrderOptionCheckboxes;