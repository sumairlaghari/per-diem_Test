import types from '../types';

const initial_state = {
  userData: {},
  token: '',
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Login:
      const data = action.payload;
      return {
        userData: data.user,
        token: data.token,
      };
    case types.Logout:
      return {
        userData: {},
        token: '',
      };
    default:
      return {...state};
  }
}
