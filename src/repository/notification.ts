import { PrismaClient } from '@prisma/client';

// import { Notification } from '../models/Notification';

const prisma = new PrismaClient();

async function create(
  userId: string,
  jobId: string,
  visualized: boolean,
  notificationText: string
) {

  return await prisma.notification.create({
    data: {
      userId,
      jobId,
      visualized,
      notificationText
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

// async function listAll() {

//   return await Notification.find();

// }

// async function deleteAll() {
//   return await Notification.deleteMany({});
// }

export { create, listAllUserNotifications, listNotificationByUserAndJobId };
