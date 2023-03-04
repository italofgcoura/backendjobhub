import jwt_decode from 'jwt-decode';

export default (jwtToken: string) => jwt_decode(jwtToken);
