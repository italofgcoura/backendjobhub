import checkIfValidFirebaseToken from './checkIfValidFirebaseToken';
// import checkIfValidToken from './checkIfValidToken';

//função que verifica se o JWT é ok
export default (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send({ auth: false, message: 'Token não informado.' });
  }

  // checkIfValidToken(token, req, res, next);

  checkIfValidFirebaseToken(req, res, next);

};
