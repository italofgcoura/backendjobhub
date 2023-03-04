
import * as repository from '../useCases/category';

import * as userRepository from '../useCases/user';

import { recoverUserFromToken } from '../useCases/token/recoverUserFromToken';

async function notAdmin(request: any) {
  const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

  const user = await userRepository.listUserData(userDataFromToken.id);

  if (!user?.isAdmin) {
    return true;
  }
}

class CagegoryController {



  async listCategories(request: any, response: any) {

    try {
      const categories = await repository.listCategories();

      if (categories) {
        return response.status(200).json(categories);
      }

      return response.send(404).send('Categories not found');

    } catch (error) {

      response.sendStatus(500);

    }
  }

  async createCategory(request: any, response: any) {

    if (await notAdmin(request)) {
      return response.status(400).json({ error: 'Only admins can perform this action' });
    }

    const { name } = request.body;

    if (!name) {
      return response.status(400).send({ error: 'Category name is required' });
    }

    try {
      const alreadyExists = await repository.listCategory(name);

      if (alreadyExists) {
        return response.status(400).json({ error: 'Category already exists', alreadyExists });
      }

      const categoryCreated = await repository.createCategory(name);

      return response.status(201).send(categoryCreated);

    } catch (error) {
      return response.status(500).json(error);
    }
  }
  async deleteCategory(request, response) {

    if (await notAdmin(request)) {
      return response.status(400).json({ error: 'Only admins can perform this action' });
    }

    const { id } = request.params;

    const deleted = await repository.deleteCategory(id);

    if (deleted.acknowledged) {
      return response.sendStatus(204);
    }

    return request.sendStatus(500);

  }

}

export default new CagegoryController();
