import { Schema, model } from 'mongoose';

export const Company = model('Company', new Schema({
  cnpj: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  location: {
    type: String
  }
}));
