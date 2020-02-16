import * as mongoose from 'mongoose';

export const UserInfoSchema = new mongoose.Schema({
  id: String,
  userId: String,
  givenName: String,
  familyName: String,
  pictureUrl: String
});
