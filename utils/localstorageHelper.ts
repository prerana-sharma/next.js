const ACCESS_TOKEN_KEY = "access-token";
const USER_INFO_KEY = "user-info";
const REFRESH_TOKEN_KEY = "refresh-token"

export const getAccessToken = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem(ACCESS_TOKEN_KEY)
    : null;
};

export const clearAccessToken = () => {
  return localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const clearAll = () => {
  return localStorage.clear();
};

export const setAccessToken = (value: string) => {
  return localStorage.setItem(ACCESS_TOKEN_KEY, `Bearer ${value}`);
};
export const setRefreshToken = (value: string) => {
  return localStorage.setItem(REFRESH_TOKEN_KEY, value);
};

export const setUserInfo = (value) => {
  return localStorage.setItem(USER_INFO_KEY, JSON.stringify(value));
};

export const setLocalStorageKey = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getUserInfo = () => {
  const userInfo =
    typeof window !== "undefined" && localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
};
