import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import styles from './App.scss';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Countries from './components/views/Countries/CountriesContainer';
import Country from './components/views/Country/CountryContainer';
import Home from './components/views/Home/Home';
// TODO - import other views
import Info from './components/views/Info/Info';
import NotFound from './components/views/NotFound/NotFound';
import Regions from './components/views/Regions/RegionsContainer';
import Trip from './components/views/Trip/TripContainer';
import Trips from './components/views/Trips/TripsContainer';
import { setMultipleStates } from './redux/globalRedux';
import parseTrips from './utils/parseTrips';

class App extends React.Component {
  static propTypes = {
    trips: PropTypes.array,
    setStates: PropTypes.func,
  };

  constructor(props) {
    super(props);
    // parse trips when App is first created
    parseTrips(this.props.trips, this.props.setStates);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trips !== this.props.trips) {
      // parse trips again if they changed
      parseTrips(this.props.trips, this.props.setStates);
    }
  }

  render() {
    const transition = {
      atEnter: {
        opacity: 1,
        translateY: 0,
      },
      atLeave: {
        opacity: 1,
        translateY: 200,
      },
      atActive: {
        opacity: 1,
        translateY: 0,
      },
    };

    function mapStyles(styles) {
      return {
        transform: `translateY(${styles.translateY}px)`,
        opacity: styles.opacity, //dlaczego opacity inne niz 1 "zaslania" transition?
      };
    }

    return (
      <BrowserRouter>
        <MainLayout>
          <AnimatedSwitch
            atLeave={transition.atEnter}
            atEnter={transition.atLeave}
            atActive={transition.atActive}
            mapStyles={mapStyles}
            className={styles.switchWrapper}
          >
            <Route exact path="/" component={Home} />
            <Route exact path="/trips" component={Trips} />
            <Route exact path="/info" component={Info} />
            <Route exact path="/countries" component={Countries} />
            <Route exact path="/regions" component={Regions} />
            <Route exact path="/country/:id" component={Country} />
            <Route exact path="/trip/:id" component={Trip} />
            <Route path="*" component={NotFound} />
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  trips: state.trips,
});

const mapDispatchToProps = (dispatch) => ({
  setStates: (newState) => dispatch(setMultipleStates(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
