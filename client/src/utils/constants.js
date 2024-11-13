const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = `${HOST}/api/auth`;
export const REGISTER_ROUTE = `${AUTH_ROUTES}/register`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const USER_INFO = `${AUTH_ROUTES}/current-user-info`;
export const GET_ALL_USERS_ROUTE = `${AUTH_ROUTES}/get-all-users`;
export const UPDATE_BIODATA_ROUTE = `${AUTH_ROUTES}/update-biodata`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;