import { getAuth } from "../utils/requestAuth";

export const getTransaction = async (token) => {
    const result = await getAuth(`transactions`, token);
    return result;
}