class ToolsStore {
  constructor() {
    this.toolsById = {};
  }
  setToolsById(tools) {
    const newToolsById= tools.reduce((toolsById, tool) => {
      toolsById[tool.id] = tool;
      return toolsById;
    }, {});
    this.toolsById = Object.assign({}, this.toolsById, newToolsById);
    return this.toolsById;
  }
  getToolsById() {
    return this.toolsById;
  }
  getTools() {
    return Object.keys(this.toolsById).map(key => this.toolsById[key]);
  }
  setUserToolbox(tools) {
    this.userToolbox = tools;
    return this.userToolbox;
  }
  getUserToolbox(tools) {
    return this.userToolbox;
  }
}

const toolsStore = new ToolsStore();
export default toolsStore;
