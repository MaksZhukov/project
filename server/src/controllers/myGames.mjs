import myGamesService from '../bll/services/myGames.mjs';
import { app } from '../app.mjs';

app.post('/api/add-favorite', (req, res) => {
  const { userId, gameId } = req.body;
  myGamesService.addFavorite({ userId, gameId }).then((responseAddFavorite) => {
    res.json(responseAddFavorite.client);
  });
});

app.post('/api/remove-favorite', (req, res) => {
  const { userId, gameId } = req.body;
  myGamesService.removeFavorite({ userId, gameId }).then((responseRemoveFavorite) => {
    res.json(responseRemoveFavorite.client);
  });
});

app.post('/api/get-my-games', (req, res) => {
  const { offset, userId } = req.body;
  myGamesService.getMyGames({ offset, userId }).then((responseGetMyGames) => {
    res.json(responseGetMyGames.client);
  });
});

app.post('/api/add-images', (req, res) => {
  const { userId, gameId } = req.body;
  const { files } = req;
  myGamesService.addImages({ userId, gameId: Number(gameId), files }).then((responsAddImages) => {
    res.json(responsAddImages.client);
  });
});
