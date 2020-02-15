import * as mongoose from 'mongoose';

export interface UserInfo extends mongoose.Document {
    id: string;
    givenName: string;
    familyName: string;
    pictureUrl: string;
  }
