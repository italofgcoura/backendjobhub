
import { recoverUserFromToken } from './recoverUserFromToken';
import createToken from './createToken';
import * as userRepository from '../../useCases/user';

const refreshToken = async (refreshToken, response) => {

  const { id } = recoverUserFromToken(refreshToken);

  const user = await userRepository.listUserById(id);

  if (!user) {
    return response.status(401).json({ message: 'Invalid token' });
  }

  const newToken = createToken(id);

  return response.status(200).send({ auth: true, ...newToken });
};

export { refreshToken };
