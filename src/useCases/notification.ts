import { Notification } from '../models/Notification';

async function list() {
  //   return await Notification.find({
  //     $or: [
  //       { userType: { $in: [...clientType] } },
  //       { userType: 'all' }
  //     ]
  //   });
}

async function create(type, text, userType) {

  return await Notification.create({ type, text, userType });

}

async function listAll() {

  return await Notification.find();

}

async function deleteAll() {
  return await Notification.deleteMany({});
}

export { list, create, listAll, deleteAll };
