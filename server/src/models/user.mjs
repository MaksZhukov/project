import mongoose from 'mongoose';
import config from 'config';

const UserSchema = new mongoose.Schema({
  profileId: Number,
  name: String,
  mail: String,
  pass: String,
  provider: String,
  token: String,
  active: Boolean,
  created: {
    type: Date,
    default: new Date(),
  },
  updated: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model(config.dataBase.collections.users, UserSchema,
  config.dataBase.collections.users);
