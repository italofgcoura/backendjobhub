import { databaseConnect } from './config/database';

import express from 'express';

import { router } from './routes';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import * as admin from 'firebase-admin';

const serviceAccount = './me-contrata-be6b0-firebase-adminsdk-l5opu-22e60f6256.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


databaseConnect();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // tempo de cashe de requisições de pre-flight
  res.setHeader('Access-Control-Max-Age', '');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(router);

export default app;
