import { createSelector } from 'reselect';

const getGames = state => state.game.games;
const getMessages = state => state.chat.messages;

export const gamesSelector = createSelector(getGames, games => games);
export const messagesSelector = createSelector(getMessages, messages => messages);
