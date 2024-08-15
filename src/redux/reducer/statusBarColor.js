import types from '../types';

const initial_state = {
  colorState: 'light-content',
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LightContent:
      return {
        colorState: 'light-content',
      };
    case types.DarkContent:
      return {
        colorState: 'dark-content',
      };
    default:
      return {...state};
  }
}
