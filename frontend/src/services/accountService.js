import { getAuth, patchAuth, postAuth } from "../utils/requestAuth";

export const getAccount = async (token) => {
    const result = await getAuth(`accounts`, token);
    return result;
}

export const createAccount = async (options, token) => {
    const result = await postAuth(`accounts/create`, options, token);
    return result;
}

export const addAmount = async (id, options, token) => {
    const result = await patchAuth(`accounts/addMonney/${id}`, options, token);
    return result;
}

export const delAcc = async (id, token) => {
    const result = await patchAuth(`accounts/deleteAccount/${id}`, {}, token);
    return result;
}