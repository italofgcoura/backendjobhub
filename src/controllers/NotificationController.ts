import * as notificationRepository from '../repository/notification';

import { recoverUserFromToken } from '../useCases/token/recoverUserFromToken';

class NotificationController {

  async createNotification(
    userId: string,
    jobId: string,
    visualized: boolean,
    notificationText: string
  ) {
    try {

      const notification = await notificationRepository.create(
        userId,
        jobId,
        visualized,
        notificationText
      );
      console.log('notification', notification);

      return true;
    } catch (error) {
      console.log('error creating notification', error);
      return false;
    }

  }

  async listUserNotifications(request, response) {

    try {
      const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

      const userNotification = await notificationRepository.listAllUserNotifications(userDataFromToken.id);

      console.log('userDataFromToken.id', userDataFromToken.id);

      console.log('userNotification', userNotification);

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
