import PropTypes from 'prop-types';
import React from 'react';

import styles from './OrderOption.module.scss';

const OrderOptionText = ({ setOptionValue }) => (
  <div>
    <input
      className={styles.input}
      onChange={(event) => setOptionValue(event.currentTarget.value)}
      placeholder="John Doe"
      type="text"
    />
  </div>
);

OrderOptionText.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
