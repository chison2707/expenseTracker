import { getAuth } from "../utils/requestAuth";

export const getTransaction = async (token, { page }) => {
    const result = await getAuth(`transactions?page=${page}`, token);
    return result;
}