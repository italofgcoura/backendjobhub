import { PrismaClient } from '@prisma/client';

// import { Notification } from '../models/Notification';

const prisma = new PrismaClient();

async function create(
  userId: string,
  jobId: string,
  visualized: boolean,
  notificationText: string
) {

  const newNotification = await prisma.notification.create({
    data: {
      userId,
      jobId,
      visualized,
      notificationText
    }
  });

  const existsNewNotificationUser = await prisma.newNotification.findFirst({ where: { userId: userId } });

  if (existsNewNotificationUser) {
    await prisma.newNotification.update({
      where: {
        userId: userId
      },
      data: {
        newNotification: true
      }
    });

  }
  else {
    await prisma.newNotification.create({
      data: {
        userId: userId,
        newNotification: true
      }
    });
  }

  return newNotification;
}

async function checkIfNewNotification(userId: string) {
  return await prisma.newNotification.findFirst({ where: { userId: userId } });
}

async function updateNewNotificationTable(userId: string) {
  return await prisma.newNotification.update({
    where: {
      userId: userId
    },
    data: {
      newNotification: false
    }
  });
}

async function listAllUserNotifications(userId: string) {
  return await prisma.notification.findMany({
    where: {
      userId: userId
    }
  });
}

async function listNotificationByUserAndJobId(userId: string, jobId: string) {

  return await prisma.notification.findFirst({
    where: {
      AND: [
        { jobId: jobId },
        { userId: userId }
      ]
    },
  });
}

async function markNotificationAsRead(notificationId: string) {
  return await prisma.notification.update({
    where: {
      notificationId: notificationId
    },
    data: {
      visualized: true
    }
  });
}

// async function listAll() {

//   return await Notification.find();

// }

// async function deleteAll() {
//   return await Notification.deleteMany({});
// }

export {
  create, listAllUserNotifications,
  listNotificationByUserAndJobId, checkIfNewNotification,
  updateNewNotificationTable, markNotificationAsRead
};
