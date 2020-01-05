import { COMPOSED_API_URL } from '../constants/constants';

const login = async (email, password) => {
  const user = await fetch(`${COMPOSED_API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
  return user;
};

const register = async (user) => {
  return fetch(`${COMPOSED_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user
    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
};

const getUserById = async (userId) => {
  const user = await fetch(`${COMPOSED_API_URL}/users/${userId}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
  return user;
};

const addToolIdToUser = async (userId, toolId) => {
  const result = await fetch(`${COMPOSED_API_URL}/users/${userId}/add-tool/${toolId}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
  return result;
};

const removeToolIdFromUser = async (userId, toolId) => {
  const result = await fetch(`${COMPOSED_API_URL}/users/${userId}/remove-tool/${toolId}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
  return result;
};

export default {
  login,
  register,
  getUserById,
  addToolIdToUser,
  removeToolIdFromUser
};
