import { shallow } from 'enzyme';
import React from 'react';

import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  description: '.description',
};

const mockProps = {
  title: 'Test title',
  description: 'Buy now!',
};

const trueDate = Date;
const mockDate = (customDate) =>
  class extends Date {
    constructor(...args) {
      if (args.length) {
        super(...args);
      } else {
        super(customDate);
      }
      return this;
    }
    static now() {
      return new Date(customDate).getTime();
    }
  };

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const element = shallow(<HappyHourAd {...mockProps} />);
    const renderedValue = element.find(select.description).text();
    expect(renderedValue).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

const checkDescriptionAfterTime = (time, delay, expectedDescription) => {
  it(`should show correct value ${delay} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const element = shallow(<HappyHourAd {...mockProps} />);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delay);
    global.Date = mockDate(newTime.getTime());
    jest.advanceTimersByTime(delay * 1000);
    const renderedValue = element.find(select.description).text();
    expect(renderedValue).toEqual(expectedDescription);

    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});

describe('Component HappyHourAd with mocked delay', () => {
  checkDescriptionAfterTime('11:57:58', 1, '121');
  checkDescriptionAfterTime('11:58:59', 60, '1');
  checkDescriptionAfterTime('00:00:00', 60 * 60, 11 * 60 * 60 + '');
});
