import { shallow } from 'enzyme';
import React from 'react';

import { mockDate } from '../../../utils/mockDate';
import ContactData from './ContactData';

const mockProps = {
  morning: {
    personData: [
      'Alice',
      '123.456.7890',
    ],
    timeLimits: {
      from: '8:00',
      to: '12:00',
    },
  },
  afternoon: {
    personData: [
      'Thomas',
      '000.000.0000',
    ],
    timeLimits: {
      from: '12:00',
      to: '16:00',
    },
  },
  evening: {
    personData: [
      'Helena',
      '167.280.3970',
    ],
    timeLimits: {
      from: '16:00',
      to: '22:00',
    },
  },
  night: {
    message: [
      'The office opens at 8:00 UTC',
    ],
    timeLimits: {
      from: '22:00',
      to: '8:00',
    },
  },
};

const trueDate = Date;

const checkContent = (time, shiftData) => {
  it(`should render content ${shiftData.join(' ')} at ${time}`, () => {
    global.Date = mockDate(`2021-10-14T${time}:00.000Z`);
    const element = shallow(<ContactData {...mockProps} />);
    expect(element.text()).toEqual(
      `${shiftData.join(' ')}`
    );

    global.Date = trueDate;
  });
};

describe('Component ContactData', () => {
  it('should render without error', () => {
    const element = shallow(<ContactData night={mockProps.night} />);
    expect(element).toBeTruthy();
  });

  it('should render element for content', () => {
    const element = shallow(<ContactData {...mockProps} />);
    expect(element.exists('.content')).toEqual(true);
  });

  const {afternoon, evening, morning, night} = mockProps;
  checkContent('08:00', night.message);
  checkContent('08:01', morning.personData);
  checkContent('12:00', morning.personData);
  checkContent('12:01', afternoon.personData);
  checkContent('16:00', afternoon.personData);
  checkContent('16:01', evening.personData);
  checkContent('22:00', evening.personData);
  checkContent('22:01', night.message);

  global.Date = trueDate;
});
