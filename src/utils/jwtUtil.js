import jwtDecode from 'jwt-decode'
import { JWT_TOKEN } from './constants';
import { getLocalStorage } from './storageUtils'


export let isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp < Date.now() / 1000

    } catch (e) {
        return true
    }
}
export let getToken = () => {
    const authorization = getLocalStorage(JWT_TOKEN)
    return authorization
}
