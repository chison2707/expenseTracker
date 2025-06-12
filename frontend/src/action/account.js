export const setAccount = (account) => {
    return {
        type: "SET_ACCOUNT",
        payload: account
    }
}

export const createAccountac = (account) => {
    return {
        type: "CREATE_ACCOUNT",
        payload: account
    }
}

export const addMoneyToAcc = (udtdAccount) => {
    return {
        type: "ADD_MONEY",
        payload: udtdAccount
    }
};