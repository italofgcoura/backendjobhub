
import { listUser } from '../useCases/user';

import generateToken from '../useCases/token/generateToken';
import sleep from '../utils/sleep';

class LoginController {
  async login(request, response, next) {

    await sleep(1000);

    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ error: 'Missing required field' });
    }

    const user = await listUser(email, password);

    if (user) {
      const userData = {
        _id: user._id.toString()
      };
      return generateToken(userData, response);
    }
    return response.status(401).send('Login inválido!');

  }

  logout(request, response) {
    response.status(200).send({ auth: false, token: null });
  }

}

export default new LoginController();
