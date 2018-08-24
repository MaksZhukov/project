import config from 'config';
import cloudinary from 'cloudinary';
import igdb from 'igdb-api-node';
import userGames from '../../models/userGames.mjs';
import logger from '../../common/helpers/winston/index.mjs';

const client = igdb.default(config.igdb.key);

cloudinary.config({
  cloud_name: 'dko43doe7',
  api_key: '537443224152494',
  api_secret: 'XfvKcziP7yoK8sdgOU4DqPhztIc',
});


class MyGamesService {
  async addFavorite(userIdAndGameId) {
    let response = '';
    try {
      await userGames.create(userIdAndGameId);
      response = {
        client: {
          ...config.client.response.addFavorite,
          gameId: userIdAndGameId.gameId,
        },
      };
    } catch (error) {
      logger.error(error);
    }
    return response;
  }

  async removeFavorite(userIdAndGameId) {
    let response = '';
    try {
      await userGames.remove(userIdAndGameId);
      response = {
        client: {
          ...config.client.response.removeFavorite,
          gameId: userIdAndGameId.gameId,
        },
      };
    } catch (error) {
      logger.error(error);
    }
    return response;
  }

  async gamesWithFavorite(games) {
    const response = { games: [] };
    await Promise.all(games.map(async (gameInfo) => {
      try{
        const game = await userGames.find({ gameId: gameInfo.id })
        if (game.length) {
          response.games.push({ ...gameInfo, favorite: true });
        } else {
          response.games.push({ ...gameInfo, favorite: false });
        }
        return game
      }
      catch(error){
        logger.error(error);
      }
    }));
    return response;
  }

  async getMyGames({ offset, userId }) {
    let uGames = [], games = [];
    try{
      const responseUserGames = await userGames.find({ userId });
      if (responseUserGames.length){
        uGames = responseUserGames.slice(offset);
      }
    }
    catch(error){
      logger.error(error);
    }
    try{
      games = uGames.length ? (await client.games({
        ids: uGames.map(userGameInfo => userGameInfo.gameId),
        fields: [
          'name',
          'summary',
        ],
        limit: 8,
      })).body : [];
    }
    catch(error){
      logger.error(error);
    }
    const gamesWithFavoriteAndPhotos = games.length ? games.map((gameInfo, index) => {
      const game = { ...gameInfo };
      game.favorite = true;
      game.photos = uGames[index].photos;
      return game;
    }) : [];
    return { client: { ...config.client.response.getMyGames, games: gamesWithFavoriteAndPhotos } };
  }

  async addImages({ userId, gameId, files }) {
    let urls = [];
    let response = '';
    const promisesUpload = [];
    for (const file in files) {
      promisesUpload.push(new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(null,
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result.url);
          }).end(files[file].data);
      }));
    }
    try{
      urls = await Promise.all(promisesUpload)
    }
    catch(error){
      logger.error(error)
    }
    try{
      let game = await userGames.findOneAndUpdate({ userId, gameId }, { $set: { updated: new Date() } })
      game.photos.push(...urls);
      game.save()
      response = { client: { ...config.client.response.addImages, urls, gameId } };
    }
    catch(error){
      logger.error(error);
    }
    return response;
  }
}

export default new MyGamesService();
