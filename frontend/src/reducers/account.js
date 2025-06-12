const initialState = {
    payload: []
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ACCOUNT":
            return {
                ...state,
                payload: action.payload
            };
        case "CREATE_ACCOUNT":
            return {
                ...state,
                payload: [...state.payload, action.payload]
            };
        default:
            return state;
    }
};

export default accountReducer;
