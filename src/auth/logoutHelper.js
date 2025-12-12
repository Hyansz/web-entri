let logoutFn = null;

export const registerLogout = (fn) => {
    logoutFn = fn;
};

export const logoutFromContext = () => {
    if (logoutFn) logoutFn();
};
