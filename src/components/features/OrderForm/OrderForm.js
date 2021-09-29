import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'react-flexbox-grid';

import pricing from '../../../data/pricing.json';
import { setOrderOption } from '../../../redux/orderRedux';
import OrderSummary from './../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';

const OrderForm = ({cost, options}) => (
  <Row>
    {pricing.map(pricingOption => (
      <Col md={4}>
        <OrderOption 
        key={pricingOption.id} 
        currentValue={options[pricingOption.id]} 
        setOrderOption={setOrderOption} 
        {...pricingOption} />
      </Col>
      ))}
    <Col xs={12}>
      <OrderSummary options={options} cost={cost} />
    </Col>
  </Row>
);

OrderForm.propTypes = {
  cost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;