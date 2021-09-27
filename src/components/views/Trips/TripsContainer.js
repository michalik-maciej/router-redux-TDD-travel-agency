import {connect} from 'react-redux';

import {getFilteredTrips} from '../../../redux/tripsRedux';
import Trips from './Trips';

const mapStateToProps = state => ({
  trips: getFilteredTrips(state),
});

export default connect(mapStateToProps)(Trips);
