import { API_HEADERS } from '../constants';

const fetchResponseAddFavorite = userIdAndGameId => fetch('/api/add-favorite', {
  method: 'POST',
  headers: API_HEADERS,
  body: JSON.stringify(userIdAndGameId),
}).then(response => response.json()).then(data => data);

const fetchResponseRemoveFavorite = userIdAndGameId => fetch('/api/remove-favorite', {
  method: 'POST',
  headers: API_HEADERS,
  body: JSON.stringify(userIdAndGameId),
}).then(response => response.json()).then(data => data);

const fetchResponseGetMyGames = offsetAndUserId => fetch('/api/get-my-games', {
  method: 'POST',
  headers: API_HEADERS,
  body: JSON.stringify(offsetAndUserId),
}).then(response => response.json()).then(data => data);

const fetchResponseAddImages = dataFromUser => fetch('/api/add-images', {
  method: 'POST',
  body: dataFromUser,
}).then(response => response.json()).then(data => data);

export default {
  fetchResponseAddFavorite,
  fetchResponseRemoveFavorite,
  fetchResponseGetMyGames,
  fetchResponseAddImages,
};
