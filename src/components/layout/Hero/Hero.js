import PropTypes from 'prop-types';
import React from 'react';

import HappyHourAd from '../../features/HappyHourAd/HappyHourAd';
import styles from './Hero.module.scss';

const Hero = ({ variant = '', titleText, imageSrc, ...otherProps }) => (
  <div
    {...otherProps}
    className={
      styles.component +
      variant
        .split(' ')
        .map((name) => ' ' + (styles[name] || name))
        .join('')
    }
  >
    <h2 className={styles.title}>{titleText}</h2>
    <img className={styles.image} alt="hero" src={imageSrc} />
    <div className={styles.happyHour}>
      <HappyHourAd title='Happy Hour' description='Promo is active. Buy now!' />
    </div>
  </div>
);

Hero.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  variant: PropTypes.string,
  titleText: PropTypes.node.isRequired,
};

export default Hero;
