import { createStore } from 'redux';
import * as allActions from './actions';

import reducers from './reducers';

let store = createStore(reducers);

if (module && module.hot) {
    module.hot.accept('./reducers', () => {
        const patch = require('./reducers').default;
        store.replaceReducer(patch);
    });
}

export const actions = allActions;
export default store;
