import * as repository from '../useCases/user';

import * as userRepository from '../repository/user';

import { recoverUserFromToken } from '../useCases/token/recoverUserFromToken';

import generateToken from '../useCases/token/generateToken';
import sleep from '../utils/sleep';

class UserController {
  async listUsers(request: any, response: any) {

    try {
      const users = await repository.listUsers();

      if (users) {
        return response.status(200).send(users);
      }

      return response.send(404).send('Users not found');
    } catch (error) {
      response.sendStatus(500);
    }
  }

  async listUser(request: any, response: any) {

    await sleep(1000);

    try {
      const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

      const user = await userRepository.listUserById(userDataFromToken.id);

      if (user) {
        return response.json({
          userId: user.id,
          userEmail: user.email,
        });
      }

      return response.status(404).json({ message: 'User not found' });

    } catch (error) {
      return response.sendStatus(400).json({ message: 'Invalid user id' });
    }

  }

  async createUser(request: any, response: any) {
    const { userId, email, password, name, isCompany } = request.body;

    if (!userId || !name) {
      return response.status(400).send({ error: 'Missing required field' });
    }

    try {
      // const emailAlreadyInUse = await repository.listUserByEmail(email);

      // if (emailAlreadyInUse) {
      //   return response.status(400).send({ error: 'Email already registered.' });
      // }

      // const userCreated = await repository.createUser(email, password);

      // const userCreatedId = userCreated._id.toString();

      await userRepository.createUserData(userId, name, email, isCompany || false);

      // generateToken({ _id: userId }, response);

      return response.status(200).json({ message: 'User created' });

    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }

  async createUserData(request, response) {
    const { name, address, isCompany, isAdmin, userDescription, userTechnologies, cnpj, email } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }

    const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

    try {

      const userDataCreated = await repository.createUserData(
        userDataFromToken.id,
        name,
        email,
        isCompany,
        address,
        isAdmin,
        userDescription,
        userTechnologies,
        cnpj,
      );

      return response.status(201).json(userDataCreated);

    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }

  async updateUser(request, response) {
    const { email, password } = request.body;

    try {

      const user = repository.listUserByEmail(email);

      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }

      const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

      const userUpdated = repository.updateUser(userDataFromToken.id, email, password);

      return response.status(200).json({ userUpdated });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }

  }

  async updateUserData(request, response) {
    const { name, address, isCompany, isAdmin, userDescription, userTechnologies, cnpj, email } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }

    const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

    try {

      const updatedDataCreated =
        await userRepository.updateUserData(userDataFromToken.id,
          name,
          email,
          isCompany,
          isAdmin,
          userDescription
        );


      return response.status(200).json(updatedDataCreated);

    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }

  async listUserData(request, response, next) {

    await sleep(1000);

    const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

    try {
      const userData = await userRepository.listUserData(userDataFromToken.id);

      const userObject = {
        name: userData?.name,
        isAdmin: userData?.isAdmin,
        isCompany: userData?.isCompany,
        userDescription: userData?.description,
        email: userData?.email
      };

      if (userData) {
        return response.status(200).json(userObject);
      }
      return response.status(404).json({ error: 'Dados não cadastrados' });
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async deleteUser(request, response) {
    try {

      // const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

      const deletedUser = await repository.deleteUser('iXkcjpK3APhl9vU8pcp12YW8IaF2');

      return response.status(204).json({ msg: 'Usuário deletado', deletedUser });

    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
  }

}

export default new UserController();
