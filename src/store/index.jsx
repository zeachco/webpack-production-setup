import { createStore } from 'redux';
import * as allActions from './actions';

function todos(state, action) {
	const newState = {...state};
  switch (action.type) {
		case 'COUNTER_INCREASE':
			newState.count++;
			return newState;
		case 'COUNTER_DECREASE':
			newState.count--;
			return newState;
    default:
      return state
  }
}

let store = createStore(todos, {
	count: 10
});

export const actions = allActions;
export default store;
