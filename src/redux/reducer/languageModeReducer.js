import types from '../types';

const initial_state = {
  state: 'english',
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.EnglishLanguageMode:
      return {
        state: 'english',
      };
    default:
      return {...state};
  }
}
