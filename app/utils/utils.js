import { CARD_BGS, RECIPE_BGS } from '../constants/constants';

/**
* // TODO: Dont repeat this logic.  one fucntionthat takes argument can replace all 3 of these
*/
function getRandomCardBgImage() {
  var keys = Object.keys(CARD_BGS);
  return CARD_BGS[keys[ keys.length * Math.random() << 0]];
};

function getRandomRecipeBgImage() {
  var keys = Object.keys(RECIPE_BGS);
  return RECIPE_BGS[keys[ keys.length * Math.random() << 0]];
};

function getRandomImageFromImageConstantObject(constant) {
  var keys = Object.keys(constant);
  return constant[keys[ keys.length * Math.random() << 0]];
}

/**
* Splits a sentence into two chunks
* @param {string} sentence the sentence to split to two chunks
* @returns {array} an array with 2 strings
*/
function splitSentenceForCard(sentence) {
  const wordArray = sentence.split(' ');
  let firstChunk = [];
  if (wordArray.length >= 9) {
    firstChunk = wordArray.splice(0, 5);
  } else {
    firstChunk = wordArray.splice(0, wordArray.length);
  }
  return [
    firstChunk.join(' '),
    wordArray.join(' ')
  ];
};

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

function isJwtExpired(token) {
  var dateNow = new Date();
  var decodedToken = parseJwt(token);
  if(decodedToken.exp < dateNow.getTime()/1000) {
    return true;
  }
  return false;
}

export default {
  getRandomCardBgImage,
  getRandomRecipeBgImage,
  splitSentenceForCard,
  parseJwt,
  isJwtExpired,
  getRandomImageFromImageConstantObject
};
