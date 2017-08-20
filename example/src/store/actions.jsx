import axios from 'axios';
import store from './index';

export const increase = () => {
    return { type: 'COUNTER_INCREASE' };
};

export const decrease = () => {
    return { type: 'COUNTER_DECREASE' };
};

export const loadProfile = profileUrl => {
    store.dispatch({type: 'PROFILE_LOAD_REQUEST'});
    axios.get(profileUrl)
        .then(xhr => store.dispatch({type: 'PROFILE_LOAD_DONE', payload: xhr.data}))
        .catch(err => {
            setTimeout(() => {
                store.dispatch({type: 'PROFILE_LOAD_FAILED', payload: err});
            }, 1500);
        });
};
