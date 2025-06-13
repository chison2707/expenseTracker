import { getAuth } from "../utils/requestAuth";

export const getTransaction = async (token, { page, search }) => {
    const result = await getAuth(`transactions?page=${page}&s=${search}`, token);
    return result;
}