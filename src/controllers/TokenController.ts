
import * as tokenUseCase from '../useCases/token/refreshToken';

class TokenController {

  refreshToken(request, response) {

    const token = request.headers['authorization'];

    tokenUseCase.refreshToken(token, response);

  }

}

export default new TokenController();
