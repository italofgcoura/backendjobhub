import { Schema, model } from 'mongoose';

export const Job = model('Job', new Schema({
  companyName: {
    type: String,
  },
  companyId: {
    type: String,
  },
  title: {
    type: String,
  },
  seniority: {
    type: String,
  },
  description: {
    type: Object,

    textDescription: {
      type: String,
    },
    benefits: {
      type: String
    },
    requirements: {
      type: String
    }
  },
  wage: {
    type: String
  },
  contact: {
    type: String
  },
  startDeadLine: {
    type: String,
  },
  candidates: {
    type: [String]
  },

}));
