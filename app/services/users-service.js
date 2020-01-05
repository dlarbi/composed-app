import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from './navigation-service';
import usersApi from '../api/users-api';
import { SCREEN_NAMES } from '../constants/constants';
import Utils from '../utils/utils';
import selfStore from '../stores/self';
import ToolsSelector from '../selectors/tools';
/**
* Big TODO: Maybe this is SelfService.  User Service would involve interactions wtih other usrs; not auth etc
*/

class UserService {

  static async login(email, password) {
    const result = await usersApi.login(email, password);
    if (result.token && result.status === 200) {
      await AsyncStorage.setItem('jwt', result.token);
      selfStore.setUser(result.user);
    } else {
      NavigationService.navigate(SCREEN_NAMES.LOGIN);
    }
    return result;
  }

  static async logout() {
    UserService.clearSessionJwtToken();
    selfStore.setUser(null);
  }

  static async registerUser(user) {
    const result = await usersApi.register(user);
    return result;
  }

  static async attemptLoginWithSessionJwtToken() {
    const jwt = await AsyncStorage.getItem('jwt');
    if (!jwt || Utils.isJwtExpired(jwt)) {
      NavigationService.navigate(SCREEN_NAMES.LOGIN);
    } else {
      const jwtUser = await UserService.getTokenUser();
      const user = await usersApi.getUserById(jwtUser.id);
      selfStore.setUser(user);
      NavigationService.navigate(SCREEN_NAMES.TOOLS);
    }
  }

  static async clearSessionJwtToken() {
    NavigationService.navigate(SCREEN_NAMES.LOGIN);
    return AsyncStorage.removeItem('jwt');
  }

  static async getTokenUser() {
    const jwt = await AsyncStorage.getItem('jwt');
    return Utils.parseJwt(jwt);
  }

  static async toggleToolIdToLoggedInUser(toolId) {
    const user = selfStore.getUser();
    const isInToolbox = ToolsSelector.selectIsInUserToolbox(toolId);
    let result;
    if (isInToolbox) {
      result = await usersApi.removeToolIdFromUser(user.id, toolId);
    } else {
      result = await usersApi.addToolIdToUser(user.id, toolId);
    }
    if (!result.toolIds) {
      throw new Error(`Could not add or remove the tool to this user: ${result.error}`)
    }
    selfStore.setUser(result);
    return result;
  }
};

// Uncommenting this will clear the user's cookie and force them to login again.
// Used for testing login scenarios
export default UserService;
