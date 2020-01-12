// const COMPOSED_API_URL = 'http://localhost:3000';
const COMPOSED_API_URL = 'http://192.168.0.16:3000';

const SCREEN_NAMES = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  DECKS: 'Decks',
  DECK: 'Deck',
  PROFILE: 'Profile',
  TOOLS: 'Tools',
  TOOL: 'Tool',
  TOOLBOX: 'Toolbox'
};

const TAB_NAMES = {
  TOOLBOX: 'Relaxation Toolbox',
  DECKS: 'Card Decks',
  RECIPES: 'Hormone Friendly Eating'
};

const CARD_BGS = {
  BUDDHA: require('../assets/images/buddha.jpg'),
  FIELD:require('../assets/images/field.jpg'),
  FLOWERS:require('../assets/images/flowers.jpg'),
  FOOD:require('../assets/images/food.jpg'),
  FOREST:require('../assets/images/forest.jpg'),
  GANESH:require('../assets/images/ganesh.jpg'),
  HILLS:require('../assets/images/hills.jpg'),
  LAUGHING:require('../assets/images/laughing.jpg'),
  LEAVES:require('../assets/images/leaves.jpg'),
  METEORS:require('../assets/images/meteors.jpg'),
  MILKYWAY:require('../assets/images/milkyway.jpg'),
  MOUNTAINS:require('../assets/images/mountains.jpg'),
  SITTING:require('../assets/images/sitting.jpg'),
  STANDING:require('../assets/images/standing.jpg'),
  STARS:require('../assets/images/stars.jpg'),
  SWIRL:require('../assets/images/swirl.jpg'),
  TREES:require('../assets/images/trees.jpg'),
  VALLEY:require('../assets/images/valley.jpg'),
  WAVES:require('../assets/images/waves.jpg'),
};

const RECIPE_BGS = {
  MUFFINS: require('../assets/images/muffins.jpg'),
  BOWL1: require('../assets/images/bowl1.jpg'),
  BOWL2: require('../assets/images/bowl2.jpg'),
  OMNOMS: require('../assets/images/nomnoms.jpg'),
  SMOOTHIE: require('../assets/images/smoothie.jpg'),
};

const HORMONE_CATEGORY_BGS = {
  FOOD: require('../assets/images/food.jpg'),
  LAUGHING: require('../assets/images/laughing.jpg'),
  FLOWERS: require('../assets/images/flowers.jpg'),
  LEAVES: require('../assets/images/leaves.jpg'),
  STANDNG: require('../assets/images/standing.jpg'),
};

const ICONS = {
  TOOLBOX_TAB_ICON: require('../assets/images/toolbox-tab-icon.png'),
  DECKS_ICON: require('../assets/images/decks-tab-icon.png'),
  RECIPES_TAB_ICON: require('../assets/images/recipes-tab-icon.png'),
  SHIELD: require('../assets/images/shield.png'),
  ENVELOPE: require('../assets/images/envelope.png'),
  CLOCK: require('../assets/images/clock.png'),
  PLATE: require('../assets/images/plate.png'),
  VEGETABLES: require('../assets/images/vegetables.png')
};

const IMAGES = {
  COMPOSED_LOGO: require('../assets/images/composed-logo.png'),
  KRISTA_SLIDE_IMAGE: require('../assets/images/krista.png')
};

const BACKGROUND_IMAGES = {
  DARK_WOOD: require('../assets/images/wood-bg.jpg'),
  SPACE: require('../assets/images/space.jpg'),
  TWINKLING_STARS: require('../assets/images/starsmoving.gif'),
};

export {
  SCREEN_NAMES,
  CARD_BGS,
  ICONS,
  COMPOSED_API_URL,
  IMAGES,
  BACKGROUND_IMAGES,
  TAB_NAMES,
  RECIPE_BGS,
  HORMONE_CATEGORY_BGS
};
