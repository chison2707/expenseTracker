import { get, post } from "../utils/request";

export const login = async (options) => {
    const result = await post(`users/login`, options);
    return result;
}

export const register = async (options) => {
    const result = await post(`users`, options);
    return result;
}

export const checkExits = async (key, value) => {
    const result = await get(`users?${key}=${value}`);
    return result;
}