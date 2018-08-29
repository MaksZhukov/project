import mongoose from 'mongoose';
import config from 'config';

const ChatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: config.dataBase.collections.users },
  message: String,
  created: Date,
});
export default mongoose.model(config.dataBase.collections.userChat,
  ChatSchema, config.dataBase.collections.userChat);
