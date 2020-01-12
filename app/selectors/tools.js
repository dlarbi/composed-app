import selfStore from '../stores/self';
import toolsStore from '../stores/tools';

function selectToolById(toolId) {
  const toolsById = toolsStore.getToolsById();
  return toolsById[toolId];
};

function selectLoggedInUserToolbox() {
  const user = selfStore.getUser();
  const toolsById = toolsStore.getToolsById();
  return user.toolIds.map(toolId => toolsById[toolId]);
};

function selectIsInUserToolbox(toolId) {
  const user = selfStore.getUser();
  if (!user.toolIds) {
    return false;
  }
  return user.toolIds.indexOf(toolId) > -1;
};

function selectUsersCategoriesFromTools() {
  const tools = selectLoggedInUserToolbox();
  return tools.reduce((result, tool) => {
    if (!tool.category) {
      return result;
    }
    tool.category.forEach(category => {
      if (result.indexOf(category) === -1) {
        result.push(category);
      }
    })
    return result;
  }, []);
}

function selectFilteredToolboxForUser() {
  const toolsById = toolsStore.getToolsById();
  const filteredToolboxToolIds = toolsStore.getFilteredToolboxToolIds();
  return filteredToolboxToolIds.map(id => toolsById[id]);
}

export default {
  selectToolById,
  selectLoggedInUserToolbox,
  selectIsInUserToolbox,
  selectUsersCategoriesFromTools,
  selectFilteredToolboxForUser
};
