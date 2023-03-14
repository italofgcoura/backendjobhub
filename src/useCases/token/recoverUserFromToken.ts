interface UserIDJwtPayload {
  user_id: string,
  name: string,
}

interface iProps { id: string, name: string }

import jwt_decode from 'jwt-decode';

export const recoverUserFromToken = (token: string): iProps => {

  const decodedToken = jwt_decode(token) as unknown as UserIDJwtPayload;

  return { id: decodedToken.user_id, name: decodedToken.name };

};
