// import jwt from 'jsonwebtoken';
// import fs from 'fs';

interface UserIDJwtPayload {
  user_id: string
}

import jwt_decode from 'jwt-decode';

// const publicKey = fs.readFileSync('./public.key', 'utf8');

export const recoverUserFromToken = (token: string): { id: string } => {

  // const decodedToken = jwt.verify(token, publicKey, { algorithms: ['RS256'] },
  //   function (err, decoded) {

  //     return decoded;

  //   }
  // ) as unknown as UserIDJwtPayload;

  const decodedToken = jwt_decode(token) as unknown as UserIDJwtPayload;

  return { id: decodedToken.user_id };

};


// import jwt_decode from 'jwt-decode';

// export const recoverUserFromToken = (token: string) => jwt_decode(token);
