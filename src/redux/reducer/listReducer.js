import types from '../types';

const initial_state = {
  list: [],
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.AddToList:
      return {
        ...state,
        list: [...state.list, action.payload], // Append the new object to the array
      };

    case types.RemoveFromList:
      return {
        ...state,
        list: state.list.filter((_, index) => index !== action.payload), // Remove the item at the specified index
      };

      case types.UpdateList:
        return {
          ...state,
          list: state.list.map((item, index) =>
            index === action.payload
              ? { ...item, toggleState: !item.toggleState } // Toggles the toggleState based on its current value
              : item
          ),
        };

        default:
          return {...state};
  }
}
