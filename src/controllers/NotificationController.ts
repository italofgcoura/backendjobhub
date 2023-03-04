import * as repository from '../useCases/notification';

import { recoverUserFromToken } from '../useCases/token/recoverUserFromToken';

interface Notif {
  _id: object,
  text: string,
  type: string,
  userType: string[]
}

class NotificationController {

  async listUserNotifications(request, response) {

    const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

    const notifications = await repository.list();

    // if (notifications) {
    //   const temp = notifications.map((item: Notif) => {
    //     return {
    //       notificationId: item._id,
    //       text: item.text,
    //       type: item.type,
    //       userType: item.userType
    //     };
    //   });

    //   return response.json(temp);
    // }
  }

  async deleteAll(req, res) {
    const deleted = await repository.deleteAll();

    if (deleted.acknowledged) {
      return res.sendStatus(204);
    }

    res.sendStatus(500);

  }


  async createNotification(req, res) {
    try {
      const { type, text, userType } = req.body;

      if (!type || !text || !userType) {
        return res.status(400).json({
          error: 'Missing required field'
        });
      }

      // const notification = await Notification.create({ type, text, userType });
      const notification = await repository.create(type, text, userType);

      res.status(201).json(notification);
    } catch (error) {
      res.sendStatus(500);
    }

  }

  async listAllNotifications(req, res) {
    try {
      const temp = await repository.listAll();
      res.json(temp);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default new NotificationController();
