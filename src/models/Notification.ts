import { Schema, model } from 'mongoose';

export const Notification = model('Notification', new Schema({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  userType: {
    type: Array,
    required: true
  }
}));
