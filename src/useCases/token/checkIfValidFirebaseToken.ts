import * as admin from 'firebase-admin';

export default (req: any, res: any, next: any) => {

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const idToken = authHeader.split(' ')[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(function (decodedToken) {
        return next();
      })
      .catch(function (error) {
        console.log(error);
        return res.sendStatus(403);
      });
  } else {
    res.sendStatus(401);
  }
};
