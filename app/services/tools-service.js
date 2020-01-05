import UsersService from './users-service';
import toolsStore from '../stores/tools';
import selfStore from '../stores/self';

import { getTools, getToolsByUserId, getToolById } from '../api/tools-api';

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
};

export default ToolsService;
