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

export default {
  selectToolById,
  selectLoggedInUserToolbox,
  selectIsInUserToolbox
};
