const API_DOMAIN = 'http://localhost:3000/api/v1/';

export const getAuth = async (path, token) => {
    const response = await fetch(API_DOMAIN + path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const result = await response.json();
    return result;
};
