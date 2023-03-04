import { Schema, model } from 'mongoose';

export const UserLogin = model('UserLogin', new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}));

export const UserData = model('UserData', new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
  },
  address: {
    street: { type: String },
    number: { type: String },
    city: { type: String },
  },
  isAdmin: {
    type: Boolean,
  },
  isCompany: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userDescription: {
    type: String,
  },
  userTechnologies: {
    type: [{
      _id: String,
      name: String
    }]
  }
}));

export const UserApplications = model('UserApplications', new Schema({
  userId: {
    type: String,
    required: true
  },
  applicationJobsId: {
    type: [String],
    required: true
  }
}));
