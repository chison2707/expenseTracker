const initialState = {
    payload: []
};

const accountReducer = (state = initialState, action) => {
    console.log(state, action);

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
        case "ADD_MONEY":
            return {
                ...state,
                payload: state.payload.map(acc =>
                    acc.id === action.payload.id ? action.payload : acc
                )
            };
        default:
            return state;
    }
};

export default accountReducer;
