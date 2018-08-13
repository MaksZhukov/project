import gameService from '../bll/services/game.mjs';
import app from '../app.mjs';

app.get('/api/get-data-filters', (req, res) => {
  gameService.getDataFilters().then((responseFiltersData) => {
    res.json(responseFiltersData);
  });
});

app.post('/api/get-data-images', (req, res) => {
  const { filters, offset, search } = req.body;
  gameService.getGames(filters, search, offset).then((responseGames) => {
    res.json(responseGames);
  });
});
