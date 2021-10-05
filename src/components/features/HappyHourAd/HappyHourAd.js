import PropTypes from 'prop-types';
import React from 'react';

import styles from './HappyHourAd.module.scss';

class HappyHourAd extends React.Component {
  constructor(){
    super();
    setInterval(() => this.forceUpdate(), 1000);
  }
  
  getCountdownTime () {
    const currentTime = new Date();
    const nextNoon = new Date(
      Date.UTC(
        currentTime.getUTCFullYear(), 
        currentTime.getUTCMonth(), 
        currentTime.getUTCDate(), 12, 0, 0, 0)
    );

    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }
    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }

  render() {
    let {description, title} = this.props;
    if (this.getCountdownTime() <= 23 * 60 * 60) {
      description = this.getCountdownTime() + '';
    }
    
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.description}>{description}</div>
      </div>
    );
  }
}

HappyHourAd.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default HappyHourAd;
