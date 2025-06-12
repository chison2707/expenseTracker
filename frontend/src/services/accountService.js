import { getAuth } from "../utils/requestAuth";

export const getAccount = async (token) => {
    const result = await getAuth(`accounts`, token);
    return result;
}