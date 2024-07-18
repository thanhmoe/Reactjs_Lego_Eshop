export const getToken = () => {
    return localStorage.getItem('auth_token');
};

export const setToken = (token) => {
    const TOKEN_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const expiresAt = Date.now() + TOKEN_EXPIRY_TIME;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('expiresAt', expiresAt);
};

export const isTokenExpired = () => {
    const expiresAt = localStorage.getItem('expiresAt');
    return !expiresAt || Date.now() > expiresAt;
};

export const clearToken = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expiresAt');
};

export const setTokenToRedirect = () => {
    const currentUrl = window.location.pathname;
    localStorage.setItem('redirectAfterLogin', currentUrl)
}

export const removeTokenToRedirect = () => {
    localStorage.removeItem('redirectAfterLogin')
}

export const getTokenToRedirect = () => {
    return localStorage.getItem('redirectAfterLogin') || '/'
}

