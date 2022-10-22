const TokenKey = 'access_token';

// const TokenPrefix = 'Bearer ';
const getToken = () => {
  return localStorage.getItem(TokenKey);
};
const setToken = (token: string) => {
  localStorage.setItem(TokenKey, token);
};
const clearToken = () => {
  localStorage.removeItem(TokenKey);
};

export { getToken, setToken, clearToken };
