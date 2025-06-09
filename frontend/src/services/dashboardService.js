import { getAuth } from "../utils/requestAuth";

export const dashboard = async (token) => {
    const result = await getAuth(`transactions/dashboard`, token);
    return result;
}