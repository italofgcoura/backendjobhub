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

      const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

      const user: IUserData | null = await userRepository.listUserById(userDataFromToken.id);

      if (!notificationExists) {

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

      const notificationText = `A empresa ${user?.name ?? ''} atualizou a resposta da sua candidatura.`;

      const updated = await notificationRepository.updateNotificationMessage(notificationExists.notificationId, notificationText, userId);

      console.log(updated);

      io.emit(userId, updated);

    } catch (error) {
      console.log('error creating notification', error);
      return false;
    }

  }

  async listUserNotifications(request, response) {

    try {
      const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

      const userNotification = await notificationRepository.listAllUserNotifications(userDataFromToken.id);

      const newUserNotifications = await notificationRepository.checkIfNewNotification(userDataFromToken.id);

      console.log('newUserNotifications', newUserNotifications);

      return response.status(200).json({
        notifications: userNotification, newNotification: newUserNotifications?.newNotification
      });
    }
    catch (error) {
      console.log(error);
    }

  }

  async markNewNotificationVisualized(request, response) {
    try {
      const userDataFromToken = recoverUserFromToken(request.headers['authorization']);
      await notificationRepository.updateNewNotificationTable(userDataFromToken.id, false);

      return response.sendStatus(204);
    } catch (error) {
      console.log('error marking visualized', error);
    }
  }

  async markNotificationAsRead(request, response) {

    const { notificationId } = request.body;

    try {
      const markedAsRead = await notificationRepository.markNotificationAsRead(notificationId);

      console.log(markedAsRead);

      return response.status(200).json({ markedAsRead });
    } catch (error) {
      console.log('Error marking notification readed...', error);
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
