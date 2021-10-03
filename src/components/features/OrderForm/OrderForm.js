import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'react-flexbox-grid';

import pricing from '../../../data/pricing.json';
import settings from '../../../data/settings';
import { calculateTotal } from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';
import Button from '../../common/Button/Button';
import OrderSummary from './../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';

const sendOrder = (tripCost, countryName, options, tripId, tripName) => {  
  const totalCost = formatPrice(calculateTotal(tripCost, options));
  const payload = {
    ...options,
    countryName,
    tripId,
    tripName,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const validateOrderData = (props) => {
  if (props.options.name && props.options.contact) {
    sendOrder(props.cost, props.countryName, props.options, props.tripId, props.tripName);
    window.alert(settings.popupMessages.orderConfirm);
  }
  else {
    window.alert(settings.popupMessages.orderIncomplete);    
  };
};

const OrderForm = (props) => (
  <Row>
    {pricing.map((pricingOption) => (
      <Col md={3} key={pricingOption.id}>
        <OrderOption
          key={pricingOption.id}
          currentValue={props.options[pricingOption.id]}
          setOrderOption={props.setOrderOption}
          {...pricingOption}
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary options={props.options} cost={props.cost} />
    </Col>
    <Button onClick={() => validateOrderData(props)}>Order now!</Button> {/* jak przekazać dane w formie obiektu? */}
  </Row>
);

OrderForm.propTypes = {
  cost: PropTypes.string,
  countryName: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  tripName: PropTypes.string,
};

export default OrderForm;
