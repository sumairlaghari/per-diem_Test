import types from '../types';

const initial_state = {
  state: 'dark',
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LightThemeMode:
      return {
        state: 'light',
      };
    case types.DarkThemeMode:
        return {
          state: 'dark',
        };

    default:
      return {...state};
  }
}
