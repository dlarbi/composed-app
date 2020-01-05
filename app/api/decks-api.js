import { AsyncStorage } from 'react-native';
import { COMPOSED_API_URL } from '../constants/constants';

const getDecks = async () => {
  const decks = await fetch(`${COMPOSED_API_URL}/decks`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.Items;
    });
  return decks;
}; 

const getCardsByDeckName = async (deckName) => {
  const cards = await fetch(`${COMPOSED_API_URL}/cards?deckName=${deckName}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AsyncStorage.getItem('jwt')}`
    }
  }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson.Items;
    });
  return cards;
};

export {
  getDecks,
  getCardsByDeckName
};
