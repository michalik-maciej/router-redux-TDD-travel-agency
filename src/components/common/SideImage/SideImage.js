import PropTypes from 'prop-types';
import React from 'react';

import styles from './SideImage.module.scss';

const SideImage = props => (<img  className={styles.component} src={`${props.source}`} alt=''/>);

SideImage.propTypes = {
  source: PropTypes.string.isRequired,
};

export default SideImage;
