import UsersService from './users-service';
import toolsStore from '../stores/tools';
import selfStore from '../stores/self';

import { getTools, searchTools, getToolsByUserId, getToolById } from '../api/tools-api';

class ToolsService {
  static async fetchTools() {
    const tools = await getTools();
    toolsStore.setToolsById(tools);
    return tools;
  }
  static async fetchToolById(toolId) {
    const tool = await getToolById(toolId);
    toolsStore.setToolsById([tool]);
    return tool;
  }
  static async fetchToolsByUserId(userId) {
    const tools = await getToolsByUserId(userId);
    toolsStore.setToolsById(tools);
    return tools;
  }
  static async fetchFilteredToolboxForUser(query) {
    const tools = await searchTools(query);
    toolsStore.setToolsById(tools);

    const user = await selfStore.getUser();
    const filteredTools = tools.filter(tool => user.toolIds.includes(tool.id));

    toolsStore.setFilteredToolboxToolIds(filteredTools.map(tool => tool.id));
  }
};

export default ToolsService;
