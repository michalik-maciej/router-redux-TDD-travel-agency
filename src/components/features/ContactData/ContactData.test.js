import { shallow } from 'enzyme';
import React from 'react';

import { mockDate } from '../../../utils/mockDate';
import ContactData from './ContactData';

const mockProps = {
  morning: {
    personData: {
      name: 'Alice',
      phoneNumber: '123.456.7890',
    },
    timeLimits: {
      from: '8:00',
      to: '12:00',
    },
  },
  afternoon: {
    personData: {
      name: 'Thomas',
      phoneNumber: '000.000.0000',
    },
    timeLimits: {
      from: '12:00',
      to: '16:00',
    },
  },
  evening: {
    personData: {
      name: 'Helena',
      phoneNumber: '167.280.3970',
    },
    timeLimits: {
      from: '16:00',
      to: '22:00',
    },
  },
  night: {
    message: 'The office opens at 8:00 UTC',
    timeLimits: {
      from: '22:00',
      to: '8:00',
    },
  },
};

const trueDate = Date;

const checkContentAtDay = (time, shiftData) => {
  it(`should render content ${shiftData.name} ${shiftData.phoneNumber} at ${time}`, () => {
    global.Date = mockDate(`2021-10-14T${time}:00.000Z`);

    const element = shallow(<ContactData {...mockProps} />);
    expect(element.text()).toEqual(
      `${shiftData.name} ${shiftData.phoneNumber}`
    );

    global.Date = trueDate;
  });
};

const checkContentAtNight = (time, shiftData) => {
  it(`should render content ${shiftData} at ${time}`, () => {
    global.Date = mockDate(`2021-10-14T${time}:00.000Z`);

    const element = shallow(<ContactData {...mockProps} />);
    expect(element.text()).toEqual(
      `${shiftData}`
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
  checkContentAtNight('08:00', night.message);
  checkContentAtDay('08:01', morning.personData);
  checkContentAtDay('12:00', morning.personData);
  checkContentAtDay('12:01', afternoon.personData);
  checkContentAtDay('16:00', afternoon.personData);
  checkContentAtDay('16:01', evening.personData);
  checkContentAtDay('22:00', evening.personData);
  checkContentAtNight('22:01', night.message);

  global.Date = trueDate;
});
