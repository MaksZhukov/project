import igdb from 'igdb-api-node';
import moment from 'moment';
import config from 'config';
import logger from '../../common/helpers/winston/index.mjs';

const client = igdb.default(config.igdb.key);


class GameService {
  async getDataFilters() {
    let response = {};
    let genres, platforms, gameEngines, gameModes;
    try{
      genres = client.genres({fields: 'name' })
    }
    catch(error){
      logger.error(error);
    }
    try{
      platforms = client.platforms({fields: 'name' })
    }
    catch(error){
      logger.error(error);
    }
    try{
      gameEngines = client.game_engines({fields: 'name' })
    }
    catch(error){
      logger.error(error);
    }
    try{
      gameModes = client.game_modes({fields: 'name' })
    }
    catch(error){
      logger.error(error);
    }
    response = {
      gameEngines: (await gameEngines).body,
      gameModes: (await gameModes).body,
      platforms: (await platforms).body,
      genres: (await genres).body,
    };
    return response;
  }

  async getGames(filters = {}, search = '', offset = 0, limit = 8) {
    let response = {};
    let prepareFilters = {}, games;
    if (filters.date) {
      prepareFilters['first_release_date-gte'] = moment(filters.date).unix() * 1000;
      prepareFilters['first_release_date-lte'] = (moment(filters.date).add('1', 'd').unix() - 1) * 1000;
    }
    if (filters.genre) {
      prepareFilters['genres-eq'] = filters.genre;
    }
    if (filters.platform) {
      prepareFilters['platforms-eq'] = filters.platform;
    }
    if (filters.gameEngine) {
      prepareFilters['game_engines-eq'] = filters.gameEngine;
    }
    if (filters.gameMode) {
      prepareFilters['game_modes-eq'] = filters.gameMode;
    }
    if (filters.rating) {
      prepareFilters['rating-gte'] = filters.rating.min;
      prepareFilters['rating-lte'] = filters.rating.max;
    }
    if (filters.PEGIRating) {
      prepareFilters['pegi.rating-eq'] = filters.PEGIRating;
    }
    try{
      games = (await client.games({
        fields: [
          'name',
          'rating',
          'summary',
          'first_release_date',
          'cover',
        ],
        limit,
        offset,
        filters: prepareFilters,
        search,
      })).body;
    }
    catch(error){
      logger.error(error)
    }
    const newGamesProps = games.map(({
      id, name, rating, summary, first_release_date, cover, /* eslint camelcase: "off" */
    }) => ({
      id, name, rating, summary, date: first_release_date, image: cover,
    }));
    response = {
      games: newGamesProps,
    };
    return response;
  }
}

export default new GameService();
