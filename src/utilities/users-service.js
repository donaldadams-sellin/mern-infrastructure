import * as usersAPI from './users-api';

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);
    //persist the token
    localStorage.setItem('token', token);
    return getUser();
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();

}

export function logOut() {
    localStorage.removeItem('token');
}

export function getToken() {
    // getItem returns null if nothing is found
    const token = localStorage.getItem('token');
    // if there is not a token, return null
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
        // if above is true, token is expired
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

export function getUser() {
    const token = getToken();
    // If there is a token, return the user obj
    // otherwise return null.
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export async function checkToken(){
    const dateStr = await usersAPI.checkToken();
    return new Date(dateStr);
}