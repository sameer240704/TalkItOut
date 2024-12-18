const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = `${HOST}/api/auth`;
export const REGISTER_ROUTE = `${AUTH_ROUTES}/register`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const USER_INFO = `${AUTH_ROUTES}/current-user-info`;
export const UPDATE_BIODATA_ROUTE = `${AUTH_ROUTES}/update-biodata`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;

export const FRIEND_ROUTES = `${HOST}/api/friend`;
export const FRIEND_REQUEST_ROUTE = `${FRIEND_ROUTES}/add-friend`;
export const GET_ALL_USERS_ROUTE = `${FRIEND_ROUTES}/get-all-users`;
export const GET_ALL_USER_FRIENDS = `${FRIEND_ROUTES}/get-users-friends`;

export const MESSAGE_ROUTES = `${HOST}/api/messages`;
export const GET_USER_PANEL_DETAILS = `${MESSAGE_ROUTES}/panel-details`;
export const SEND_MESSAGES = `${MESSAGE_ROUTES}/send-message`;
export const UPLOAD_DOCUMENT = `${MESSAGE_ROUTES}/upload-document`;
export const GET_ALL_MESSAGES = `${MESSAGE_ROUTES}/get-all-messages`