const defaultState = {
    count: 0,
    profile: {
        loading: false,
        data: {}
    }
};

export default (state = defaultState, action) => {
    console.log(action.type, action.payload);
    const newState = {...state};
    switch (action.type) {
        case 'COUNTER_INCREASE':
            newState.count++;
            return newState;
        case 'COUNTER_DECREASE':
            newState.count--;
            return newState;
        case 'PROFILE_LOAD_REQUEST':
            newState.profile.loading = true;
            return newState;
        case 'PROFILE_LOAD_DONE':
            newState.profile.loading = false;
            newState.profile.data = action.payload;
            return newState;
        case 'PROFILE_LOAD_FAILED':
            newState.profile.loading = false;
            newState.profile.data = action.payload;
            return newState;
        default:
            return state;
    }
};
