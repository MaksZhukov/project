import config from 'config';
import cloudinary from 'cloudinary';
import igdb from 'igdb-api-node';
import userGames from '../../models/userGames.mjs';
import logger from '../../common/helpers/winston/index.mjs';

const client = igdb.default(config.igdb.key);

cloudinary.config({
  cloud_name: 'usersPhotos',
  api_key: '537443224152494',
  api_secret: 'XfvKcziP7yoK8sdgOU4DqPhztIc',
});


class MyGamesService {
  async addFavorite(userIdAndGameId) {
    let response = '';
    await userGames.create(userIdAndGameId)
      .then(() => {
        response = {
          client: {
            ...config.client.response.removeFavorite,
            gameId: userIdAndGameId.gameId,
          },
        };
      }).catch((errGame) => {
        logger.error(errGame);
      });
    return response;
  }

  async removeFavorite(userIdAndGameId) {
    let response = '';
    console.log(userIdAndGameId);
    await userGames.remove(userIdAndGameId, (errGame) => {
      if (errGame) {
        logger.error(errGame);
      } else {
        response = {
          client: {
            ...config.client.response.removeFavorite,
            gameId: userIdAndGameId.gameId,
          },
        };
      }
    });
    return response;
  }

  async gamesWithFavorite(games) {
    const response = { games: [] };
    await Promise.all(games.map(async (gameInfo) => {
      await userGames.find({ gameId: gameInfo.id }, (errGame, arrGames) => {
        if (errGame) {
          logger.error(errGame);
        }
        if (arrGames.length) {
          response.games.push({ ...gameInfo, favorite: true });
        } else {
          response.games.push({ ...gameInfo, favorite: false });
        }
      });
    }));
    return response;
  }

  async getMyGames({ offset, userId }) {
    let uGames = [];
    await userGames.find({ userId }, (errGame, arrGames) => {
      if (errGame) {
        logger.error(errGame);
      }
      if (arrGames.length) {
        uGames = arrGames.slice(offset);
      }
    });
    const games = uGames.length ? await client.games({
      ids: uGames.map(userGameInfo => userGameInfo.gameId),
      fields: [
        'name',
        'summary',
      ],
      limit: 8,
    }).then(resGames => resGames.body).catch((error) => {
      logger.error(error.message);
    }) : [];
    const gamesWithFavoriteAndPhotos = games.length ? games.map((gameInfo, index) => {
      const game = { ...gameInfo };
      game.favorite = true;
      game.photos = uGames[index].photos;
      return game;
    }) : [];
    return { client: { ...config.client.response.getMyGames, games: gamesWithFavoriteAndPhotos } };
  }

  async addImages({ userId, gameId, file }) {
    cloudinary.uploader.upload(file, (result) => {
      console.log(result);
    });
  }
}

export default new MyGamesService();
