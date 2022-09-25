const TokenKey = 'access_token';
// const TokenPrefix = 'Bearer ';
const isLogin = () => {
  return !!localStorage.getItem(TokenKey);
};
const getToken = () => {
  return localStorage.getItem(TokenKey);
};
const setToken = (token: string) => {
  localStorage.setItem(TokenKey, token);
};
const clearToken = () => {
  localStorage.removeItem(TokenKey);
};
export { isLogin, getToken, setToken, clearToken };
