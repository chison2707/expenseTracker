import { getAuth, patchAuth } from "../utils/requestAuth";

export const getTransaction = async (token, { page, search, startDate, endDate }) => {
    const result = await getAuth(`transactions?page=${page}&s=${search}&df=${startDate}&dt=${endDate}`, token);
    return result;
}

export const tranferMoney = async (options, token) => {
    const result = await patchAuth(`transactions/transferMoney`, options, token);
    return result;
}