/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // DONE - filter by duration
  if(filters.duration) {
    output = output.filter(trip => filters.duration.from <= trip.days && filters.duration.to >= trip.days);
  };
  
  // DONE - filter by tags
  if(filters.tags.length) {  
    output = output.filter(trip => trip.tags.some(tag => filters.tags.includes(tag)) ? trip : false);
    };

  // DONE - sort by cost descending (most expensive goes first)
  output = output.sort((tripA, tripB) => {
    const costA = Number(tripA.cost.replace(/[^0-9.]+/g,""));
    const costB = Number(tripB.cost.replace(/[^0-9.]+/g,""));  //jak się nie powtarzać i podmienić "A" na "B" w pętli?

    if (costA > costB) {
      return -1;
    }
    if (costA < costB) {
      return 1;
    }
    else {
      return 0;
    }
  });

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips;
  return filtered.length ? filtered.find(trip => trip.id === tripId) : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips;
  return filtered.length ? filtered.filter(trip => trip.country.code === countryCode) : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
