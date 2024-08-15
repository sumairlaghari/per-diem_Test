import types from '../types';

const initial_state = {
  onBoardState: false,
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.OnBoardOn:
      return {
        onBoardState: true,
      };
      break;
    case types.OnBoardOff:
      return {
        onBoardState: false,
      };
      break;
    default:
      return {...state};
      break;
  }
}
