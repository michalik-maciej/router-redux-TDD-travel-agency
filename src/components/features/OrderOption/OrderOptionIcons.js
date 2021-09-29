import React from "react";

import { formatPrice } from "../../../utils/formatPrice";
import Icon from '../../common/Icon/Icon';
import styles from './OrderOption.module.scss';

const OrderOptionIcons = ({values, required, currentValue, setOptionValue}) => (
  <div className={styles.component}>
    {required ? '' : (
      <div 
        className={styles.icon}
        onClick={setOptionValue('')}
      >
        <Icon name='times-circle'/>
        none
      </div>
    )}
    {values.map( value => {
      return (<div       
        key={value.id}
        className={value.id === currentValue ? styles.iconActive : styles.icon}
        onClick={() => setOptionValue(value.id)}
      >
        <Icon name={value.icon} />
        {value.name} ({formatPrice(value.price)})
      </div>
    )})}
  </div>
);

export default OrderOptionIcons;