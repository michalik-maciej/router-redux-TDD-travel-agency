import React from "react";

import { formatPrice } from "../../../utils/formatPrice";
import styles from './OrderOption.module.scss';

const OrderOptionNumber = ({currentValue, limits, price, setOptionValue}) => (
  <div className={styles.inputSmall}>
    <input 
      className={styles.inputSmall}
      max={limits.max}
      min={limits.min}
      onChange={event => setOptionValue(event.currentTarget.value)}
      value={currentValue}
      type='number'
    />
  {formatPrice(price)}
  </div>
);

export default OrderOptionNumber;