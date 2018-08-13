import grey from '@material-ui/core/colors/grey';
import noImage from '../images/no_image_preview.jpg';

const SUB_ACTIONS_TYPES = ['SUCCESS', 'ERROR', 'LOADING'];
const NO_CONTENT_API_GAME = {
  date: 'no release date',
  summary: 'no summary',
  image: noImage,
  rating: grey,
};
const API_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const PEGI_RATING = [3, 7, 12, 16, 18];
const RATING = {
  min: 0,
  max: 100,
};
export {
  SUB_ACTIONS_TYPES, NO_CONTENT_API_GAME, API_HEADERS, PEGI_RATING, RATING,
};
