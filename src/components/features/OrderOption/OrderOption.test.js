import { shallow } from 'enzyme';
import React from 'react';
import DatePicker from 'react-datepicker';

import { formatPrice } from '../../../utils/formatPrice';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  let Component = shallow(<OrderOption type="date" name="lorem" />);

  it('should render without crashing', () => {
    expect(Component).toBeTruthy();
  });

  it('should render correct name', () => {
    expect(Component.find('.title').text()).toEqual('lorem');
  });

  it('should return empty object if called without type and name', () => {
    Component = shallow(<OrderOption />);
    expect(Component).toEqual({});
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-suite', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] },
  number: { currentValue: 1 },
  text: { placeholder: 'John Doe' },
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'checkboxes': {
        it('contains labels and inputs with props type, value and checked', () => {
          const checkboxWrapper = renderedSubcomponent.find('.checkboxes');
          expect(checkboxWrapper).toBeTruthy();

          const labels = checkboxWrapper.find('.icon');
          expect(labels.at(0).text()).toBe(
            `${mockProps.values[0].name}(${formatPrice(
              mockProps.values[0].price
            )})`
          );
          expect(labels.at(1).text()).toBe(
            `${mockProps.values[1].name}(${formatPrice(
              mockProps.values[1].price
            )})`
          );

          const checkboxes = checkboxWrapper.find('input');
          checkboxes.forEach((node) => {
            expect(node.prop('type')).toBe('checkbox');
          });
          expect(checkboxes.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(checkboxes.at(0).prop('checked')).toBe(
            mockPropsForType.checkboxes.currentValue == mockProps.values[0].id
          );

          expect(checkboxes.at(1).prop('value')).toBe(mockProps.values[1].id);
          expect(checkboxes.at(1).prop('checked')).toBe(
            mockPropsForType.checkboxes.currentValue == mockProps.values[1].id
          ); // jak równocześnie iterować po node'ach i array'u?
        });

        it('should run setOrderOption function on change', () => {
          const testInput = renderedSubcomponent.findWhere(
            (element) => element.prop('value') === testValue
          );
          testInput.simulate('change', { currentTarget: { checked: true } });

          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: [mockProps.currentValue, testValue],
          }); //WTF???????
        });
        break;
      }

      case 'date': {
        it('contains DatePicker', () => {
          const datePicker = renderedSubcomponent.find(DatePicker);
          expect(datePicker.length).toBe(1);
          console.log(mockPropsForType.date.minDate);
        });

        it('should run setOrderOption function on change', () => {
          const datePicker = renderedSubcomponent.find(DatePicker);

          datePicker.simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });
        break;
      }

      case 'dropdown': {
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent
            .find('select')
            .simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });
        break;
      }

      case 'icons': {
        it('contains divComponent with structure divIcon > Icon', () => {
          const divComponent = renderedSubcomponent.find('.component');
          expect(divComponent.length).toBe(1);

          const divIconNone = renderedSubcomponent.find('.icon').at(0);
          const IconNone = divIconNone.childAt(0);
          expect(divIconNone.text()).toBe(`<Icon />none`);
          expect(IconNone.prop('name')).toBe('times-circle');

          const divIconActive = renderedSubcomponent.find('.iconActive');
          const IconActive = divIconActive.childAt(0);
          expect(divIconActive.text()).toBe(
            `<Icon />${mockProps.values[0].name} (${formatPrice(
              mockProps.values[0].price
            )})`
          );
          expect(IconActive.prop('name')).toBe(mockProps.values[0].icon);

          const divIcon = renderedSubcomponent.find('.icon').at(1);
          const Icon = divIcon.childAt(0);
          expect(divIcon.text()).toBe(
            `<Icon />${mockProps.values[1].name} (${formatPrice(
              mockProps.values[1].price
            )})`
          );
          expect(Icon.prop('name')).toBe(mockProps.values[1].icon);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.icon').at(1).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });

        break;
      }

      case 'number': {
        it('contains input with correct props type, min, max and value', () => {
          expect(renderedSubcomponent.find('.inputSmall')).toBeTruthy();
          expect(renderedSubcomponent.find('.inputSmall').text()).toBe(
            mockProps.price
          );

          const input = renderedSubcomponent.find('input');
          expect(input.prop('type')).toBe('number');
          expect(input.prop('max')).toBe(mockProps.limits.max);
          expect(input.prop('min')).toBe(mockProps.limits.min);
          expect(input.prop('value')).toBe(
            mockPropsForType.number.currentValue
          );
        });

        it('should run setOrderOption on change', () => {
          renderedSubcomponent
            .find('input')
            .simulate('change', { currentTarget: { value: testValueNumber } });

          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValueNumber,
          });
        });
        break;
      }

      case 'text': {
        it('contains input with correct props class, type and placeholder', () => {
          const input = renderedSubcomponent.find('.input');

          expect(input).toBeTruthy();
          expect(input.prop('type')).toBe('text');
          expect(input.prop('placeholder')).toBe(
            mockPropsForType.text.placeholder
          );
        });

        it('should run setOrderOption on change', () => {
          renderedSubcomponent
            .find('input')
            .simulate('change', { currentTarget: { value: testValue } });

          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });
        break;
      }
    }
  });
}
