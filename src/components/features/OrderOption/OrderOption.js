import PropTypes from 'prop-types';
import React from 'react';

import styles from './OrderOption.module.scss';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionDate from './OrderOptionDate';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionText from './OrderOptionText';

const optionTypes = {
  checkboxes: OrderOptionCheckboxes,
  date: OrderOptionDate,
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  number: OrderOptionNumber,
  text: OrderOptionText,
};

const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
  const OptionComponent = optionTypes[type];
  if (!OptionComponent) {
    return null;
  }
  else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          setOptionValue={value => setOrderOption({[id]: value})}
          {...otherProps}
        />
      </div>
    );
  }
};

OrderOption.propTypes = {
  name: PropTypes.string,
  setOrderOption: PropTypes.func,
};

export default OrderOption;