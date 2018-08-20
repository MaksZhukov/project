import mongoose from 'mongoose';
import config from 'config';

const UserGamesSchema = new mongoose.Schema({
  userId: Object,
  gameId: Number,
  photos: {
    type: Array,
    default: [],
  },
  created: {
    type: Date,
    default: new Date(),
  },
  updated: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model(config.dataBase.collections.userGames, UserGamesSchema);
