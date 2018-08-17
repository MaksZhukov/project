import myGamesService from '../bll/services/myGames.mjs';
import app from '../app.mjs';

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
  const { file, userId, gameId } = req.body;
  console.log(req.body);
  myGamesService.addImages({ userId, gameId, file }).then((responsAddImages) => {

  });
});
