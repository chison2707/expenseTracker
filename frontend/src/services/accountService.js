import { getAuth, postAuth } from "../utils/requestAuth";

export const getAccount = async (token) => {
    const result = await getAuth(`accounts`, token);
    return result;
}

export const createAccount = async (options, token) => {
    const result = await postAuth(`accounts/create`, options, token);
    return result;
}