import { createSelector } from 'reselect';

const getGames = state => state.game.games;

export const gamesSelector = createSelector(getGames, games => games);
