import * as actionTypes from './greetingActionTypes';

export const getGreetingText = () => {
  return {
    type: actionTypes.GET_GREETING_TEXT,
  };
};