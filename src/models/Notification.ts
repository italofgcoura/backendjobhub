import { Schema, model } from 'mongoose';

export const Notification = model('Notification', new Schema({
  userId: {
    type: String,
    required: true
  },
  jobId: {
    type: Array,
    required: true
  },
  visualized: {
    type: Array,
    required: true
  },
  notificationText: {
    type: Array,
    required: true
  },
}));
