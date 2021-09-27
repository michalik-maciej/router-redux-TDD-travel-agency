/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
export const CHANGE_DURATION_TO = createActionName('CHANGE_DURATION_TO'); 
export const CHANGE_DURATION_FROM = createActionName('CHANGE_DURATION_FROM');
export const ADD_TAG = createActionName('ADD_TAG');
export const REMOVE_TAG = createActionName('REMOVE_TAG');

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const changeDurationTo = payload => ({payload, type: CHANGE_DURATION_TO});
export const changeDurationFrom = payload => ({payload, type: CHANGE_DURATION_FROM});
export const addTag = payload => ({payload, type: ADD_TAG});
export const removeTag = payload => ({payload, type: REMOVE_TAG});

// reducer
export default function reducer(statePart = [], action = {}) {
  const tagsList = statePart.tags;
 
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    case CHANGE_DURATION_FROM:
      return {
        ...statePart,
        duration: {
          ...statePart.duration,
          from: action.payload,
        },
      };
    case CHANGE_DURATION_TO:
      return {
        ...statePart,
        duration: {
          ...statePart.duration,
          to: action.payload,
        },
      };
    case ADD_TAG: 
      tagsList.push(action.payload);      
      return {
        ...statePart,
        tags: tagsList,
      };
    case REMOVE_TAG: 
      tagsList.splice(tagsList.indexOf(action.payload), 1);
      return {
        ...statePart,
        tags: tagsList,
      };
    default:
      return statePart;
  }
}
