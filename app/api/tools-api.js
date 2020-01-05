import { AsyncStorage } from 'react-native';
import { COMPOSED_API_URL } from '../constants/constants';

const getTools = async () => {
  const tools = await fetch(`${COMPOSED_API_URL}/tools`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.Items;
    });
  return tools;
};

const getToolById = async (toolId) => {
  const tool = await fetch(`${COMPOSED_API_URL}/tools/${toolId}`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson', responseJson)
      return responseJson;
    });
  return tool;
};

// TODO: We should use a self.getTools route that gets the users tools.  Not by userId
const getToolsByUserId = async (userId) => {
  const tools = await fetch(`${COMPOSED_API_URL}/users/${userId}/tools`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
  return tools;
};

export {
  getTools,
  getToolsByUserId,
  getToolById
};
