import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'react-flexbox-grid';

import OrderSummary from './../OrderSummary/OrderSummary';

const OrderForm = ({cost, options}) => (
  <Row>
    <Col xs={12}>
      <OrderSummary options={options} cost={cost} />
    </Col>
  </Row>
);

OrderForm.propTypes = {
  cost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;