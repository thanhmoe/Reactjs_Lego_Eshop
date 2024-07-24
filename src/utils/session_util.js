//save session for filter categories products
export const saveSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const loadSession = (key) => {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

export const clearSession = (key) => {
    sessionStorage.removeItem(key);
};
