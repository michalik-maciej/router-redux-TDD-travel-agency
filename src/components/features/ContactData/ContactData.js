import PropTypes from 'prop-types';
import React from 'react';

import styles from './ContactData.module.scss';

class ContactData extends React.Component {
  render() {
    let content = this.props.night.message;
    let currentTime = new Date();
    const shiftLimits = {};

    for (const shift in this.props) {
      shiftLimits[shift] = {};

      for (const limit in this.props[shift].timeLimits) {
        shiftLimits[shift][limit] = new Date(
          Date.UTC(
            currentTime.getUTCFullYear(),
            currentTime.getUTCMonth(),
            currentTime.getUTCDate(),
            this.props[shift].timeLimits[limit].split(':')[0],
            this.props[shift].timeLimits[limit].split(':')[1],
            0,
            0
          )
        );
        shiftLimits[shift][limit] = shiftLimits[shift][limit].getTime();
      }

      if (
        currentTime.getTime() > shiftLimits[shift].from &&
        currentTime.getTime() <= shiftLimits[shift].to
      ) {
        content = this.props[shift].personData.join(' ');
      }
    }

    return (
      <span className={styles.content} >
        {content}
      </span>
    );
  }
}

ContactData.propTypes = {
  night: PropTypes.object.isRequired,
};

export default ContactData;
