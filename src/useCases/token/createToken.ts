import jwt from 'jsonwebtoken';
import fs from 'fs';

const privateKey = fs.readFileSync('./private.key', 'utf8');

export default (id: string) => {
  const token = jwt.sign({ id }, privateKey, {
    expiresIn: 3600, //tempo de expiração: 1 hora
    algorithm: 'RS256' //SHA-256 hash signature
  });

  const refreshToken = jwt.sign({ id }, privateKey, {
    algorithm: 'RS256' //SHA-256 hash signature
  });

  return { token, refreshToken };

};
