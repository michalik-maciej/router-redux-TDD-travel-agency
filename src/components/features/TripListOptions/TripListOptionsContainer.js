import {connect} from 'react-redux';

import {addTag, changeDurationFrom, changeDurationTo, changeSearchPhrase, getAllFilters, removeTag} from '../../../redux/filtersRedux';
import {getAllTags} from '../../../redux/tagsRedux';
import TripListOptions from './TripListOptions';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  changeDurationFrom: daysNum => dispatch(changeDurationFrom(daysNum)),
  changeDurationTo: daysNum => dispatch(changeDurationTo(daysNum)),
  addTag: tag => dispatch(addTag(tag)),
  removeTag: tag => dispatch(removeTag(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
