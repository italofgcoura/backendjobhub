import createToken from './createToken';

interface IUser {
  _id: string
}

export default (user: IUser, response) => {

  const { _id } = user;

  const { token, refreshToken } = createToken(_id);

  return response.status(200).json({ auth: true, token, refreshToken });
};
