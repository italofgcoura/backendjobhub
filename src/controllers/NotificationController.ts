import * as notificationRepository from '../repository/notification';

import { recoverUserFromToken } from '../useCases/token/recoverUserFromToken';

import * as userRepository from '../repository/user';

import { IUserData } from '../interfaces/userInterfaces';

import { io } from '../index';

class NotificationController {

  async createNotification(
    userId: string,
    jobId: string,
    visualized: boolean,
    request: any
  ) {
    try {

      const notificationExists = await notificationRepository.listNotificationByUserAndJobId(userId, jobId);

      if (!notificationExists) {

        const userDataFromToken = recoverUserFromToken(request.headers['authorization']);


        const user: IUserData | null = await userRepository.listUserById(userDataFromToken.id);

        const notificationText = `A empresa ${user?.name ?? ''} respondeu à sua candidatura.`;

        const newNotificationCreated = await notificationRepository.create(
          userId,
          jobId,
          visualized,
          notificationText
        );

        console.log('newNotificationCreated', newNotificationCreated);

        io.emit(userId, newNotificationCreated);

        return true;

      }
    } catch (error) {
      console.log('error creating notification', error);
      return false;
    }

  }

  async listUserNotifications(request, response) {

    try {
      const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

      const userNotification = await notificationRepository.listAllUserNotifications(userDataFromToken.id);

      return response.status(200).json(userNotification);
    }
    catch (error) {
      console.log(error);
    }

  }

  // async deleteAll(req, res) {
  //   const deleted = await repository.deleteAll();

  //   if (deleted.acknowledged) {
  //     return res.sendStatus(204);
  //   }

  //   res.sendStatus(500);

  // }




  // async listAllNotifications(req, res) {
  //   try {
  //     const temp = await repository.listAll();
  //     res.json(temp);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }

}

export default new NotificationController();
