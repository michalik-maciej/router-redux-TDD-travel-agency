import PropTypes from 'prop-types';
import React from 'react';
import {Col, Row} from 'react-flexbox-grid';

import styles from './TripListOptions.module.scss';

class TripListOptions extends React.Component {
  handleTags(tag, checked){
    if(checked) {
      this.props.addTag(tag);
    } 
    else {
      this.props.removeTag(tag);
    }
  }

  handleDuration(type, value){    
    const daysNum = parseInt(value);
    if(type === 'from' && daysNum <= this.props.filters.duration.to) {
      this.props.changeDuration({from: daysNum, to: this.props.filters.duration.to});
    }
    else if (type === 'to' && daysNum >= this.props.filters.duration.from) {
      this.props.changeDuration({from: this.props.filters.duration.from, to: daysNum});
    }
    //this.props[`changeDuration${type}`](daysNum); // A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.
    //this.setState({props: {[`changeDuration${type}`]: daysNum}}); //dlaczego to nie działa?
  }

  handleSearch(phrase){
    this.props.changeSearchPhrase(phrase);
  }

  render(){
    const {tags, filters} = this.props;
    return (
      <div className={styles.component}>
        <Row around="lg">
          <Col lg={4}>
            <div className={styles.filter}>
              <label>
                <input className={`${styles.input} ${styles.search}`} type='text' placeholder='Search...' value={filters.phrase} onChange={event => this.handleSearch(event.currentTarget.value)} />
              </label>
            </div>
          </Col>
          <Col lg={4}>
            <div className={styles.filter}>
              <label>
                Duration from:
                <input className={`${styles.input} ${styles.number}`} type='number' value={filters.duration.from} min='1' max='14' onChange={event => this.handleDuration('from', event.currentTarget.value)} />
              </label>
              <label>
                to:
                <input className={`${styles.input} ${styles.number}`} type='number' value={filters.duration.to} min='1' max='14' onChange={event => this.handleDuration('to', event.currentTarget.value)} />
              </label>
            </div>
          </Col>
          <Col lg={4}>
            <div className={styles.filter}>
              <details>
                <summary className={styles.toggle}>Filter by tags</summary>
                <div className={styles.dropdown}>
                  {Object.keys(tags).map(tag => (
                    <label key={tag} className={styles.option}>
                      <input type='checkbox' checked={filters.tags.indexOf(tag) > -1} onChange={event => this.handleTags(tag, event.currentTarget.checked)} />
                      {tag}
                    </label>
                  ))}
                </div>
              </details>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

TripListOptions.propTypes = {
  tags: PropTypes.object,
  filters: PropTypes.object,
  changeSearchPhrase: PropTypes.func,
  changeDurationTo: PropTypes.func,
  changeDurationFrom: PropTypes.func,
};

export default TripListOptions;
