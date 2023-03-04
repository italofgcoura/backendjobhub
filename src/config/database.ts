import * as dotenv from 'dotenv';

dotenv.config();

function validateNonNull(value?: string) {
  if (value === undefined) { throw new Error('.env not valid'); }
  return value;
}
class EnvProps {
  readonly MONGO_URI: string;

  constructor() {
    this.MONGO_URI = validateNonNull(process.env.MONGO_URI);

  }
}



const { MONGO_URI } = new EnvProps();

import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export const databaseConnect = () => {
  mongoose.connect(MONGO_URI).then(() => {
    console.log('Successfully conected to database...');
  }).catch((error) => {
    console.log('Database conection failed...');
    console.log(error);
    process.exit(1);
  });
};
