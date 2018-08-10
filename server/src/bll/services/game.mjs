import igdb from 'igdb-api-node';
import moment from 'moment';
import config from 'config';
import logger from '../../common/helpers/winston/index.mjs';

const client = igdb.default(config.igdb.key);


class GameService {
  async getDataFilters() {
    let response = {};
    const genres = client.genres({
      fields: 'name',
    }).then(resGenres => resGenres.body).catch((error) => {
      logger.error(error);
    });
    const platforms = client.platforms({
      fields: 'name',
    }).then(resPlatforms => resPlatforms.body).catch((error) => {
      logger.error(error);
    });
    const gameEngines = client.game_engines({
      fields: 'name',
    }).then(resGameEngines => resGameEngines.body).catch((error) => {
      logger.error(error);
    });
    const gameModes = client.game_modes({
      fields: 'name',
    }).then(resGameModes => resGameModes.body)
      .catch((error) => {
        logger.error(error);
      });
    response = {
      gameEngines: await gameEngines,
      gameModes: await gameModes,
      platforms: await platforms,
      genres: await genres,
    };
    return response;
  }

  async getGames(filters = {}, search = '', offset = 0, limit = 8) {
    let response = {};
    const prepareFilters = { };
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
    const games = await client.games({
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
    }).then(resGames => resGames.body).catch((error) => {
      logger.error(error.message);
    });
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
