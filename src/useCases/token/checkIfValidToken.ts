// import fs from 'fs';
// import jwt from 'jsonwebtoken';

// export default (token: any, req: any, res: any, next: any) => {

//   const publicKey = fs.readFileSync('./public.key', 'utf8');

//   jwt.verify(token, publicKey, { algorithms: ['RS256'] },
//     function (err) {

//       if (err) {
//         return res.status(401).send(
//           { auth: false, message: `Invalid token.: ${err.name}` });
//       }

//       next();
//     });
// };


import jwt_decode from 'jwt-decode';

export default (jwtToken: string) => jwt_decode(jwtToken);
