import grey from '@material-ui/core/colors/grey';
import noImage from '../images/no_image_preview.jpg';

const SUB_ACTIONS_TYPES = ['SUCCESS', 'ERROR', 'LOADING'];
const NO_CONTENT_API_GAME = {
  DATE: 'no release date',
  SUMMARY: 'no summary',
  IMAGE: noImage,
  RATING: grey,
};
const API_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const PEGI_RATING = [3, 7, 12, 16, 18];
const RATING = {
  MIN: 0,
  MAX: 100,
};
const COLS_FOR_EACH_THIRD_IMAGE = 2;
const COLS_FOR_NO_EACH_THIRD_IMAGE = 1;
const COUNT_GAMES_ON_ROW = 4;
const OFFSET_SCROLL_LIST_BOTTOM = 100;
export {
  SUB_ACTIONS_TYPES, NO_CONTENT_API_GAME, API_HEADERS, PEGI_RATING, RATING,
  COUNT_GAMES_ON_ROW, COLS_FOR_NO_EACH_THIRD_IMAGE, COLS_FOR_EACH_THIRD_IMAGE,
  OFFSET_SCROLL_LIST_BOTTOM,
};
