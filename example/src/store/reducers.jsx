const defaultState = {
    count: 0
};

export default (state = defaultState, action) => {
    const newState = {...state};
    switch (action.type) {
        case 'COUNTER_INCREASE':
            newState.count++;
            return newState;
        case 'COUNTER_DECREASE':
            newState.count--;
            return newState;
        default:
            return state;
    }
};
