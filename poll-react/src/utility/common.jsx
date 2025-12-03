import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const TOKEN = 'token';

export const saveToken = (token) => {
    Cookies.set(TOKEN, token);
}

export const getToken = () => {
    return Cookies.get(TOKEN);
}

export const removeToken = () => {
    Cookies.remove(TOKEN);
}

export const decodeToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export const isTokenValid = () => {
    const decodedToken = decodeToken();
    if (!decodedToken || !decodedToken.exp) return false;

    const expiry = decodedToken.exp * 1000;
    return Date.now() < expiry;
}