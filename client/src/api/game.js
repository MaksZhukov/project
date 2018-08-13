import { API_HEADERS } from '../constants';

const fetchResponseGetDataFilters = () => fetch('/api/get-data-filters').then(response => response.json()).then(data => data);
const fetchResponseGetDataGames = filtersAndOffset => fetch('/api/get-data-images', {
  method: 'POST',
  headers: API_HEADERS,
  body: JSON.stringify(filtersAndOffset),
}).then(response => response.json()).then(data => data);
export default {
  fetchResponseGetDataFilters,
  fetchResponseGetDataGames,
};
