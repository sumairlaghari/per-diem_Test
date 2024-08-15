import types from '../types';

const initial_state = {
  loaderState: false,
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LoaderOn:
      return {
        loaderState: true,
      };
    case types.LoaderOff:
      return {
        loaderState: false,
      };
    default:
      return {...state};
  }
}
