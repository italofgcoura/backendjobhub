import { UserLogin, UserData, UserApplications } from '../models/User';

async function listUserByEmail(email: string) {
  return await UserLogin.findOne({ email });
}

async function listUser(email: string, password: string) {
  return await UserLogin.findOne({ email, password });
}

async function listUsers() {

  return await UserLogin.find();

}

async function deleteUser(id: string) {

  // const userData = await UserLogin.findById(id);

  // return await UserLogin.deleteOne({ _id: id });


  return await UserLogin.deleteMany();

}

async function listUserById(id: string) {

  return await UserLogin.findById(id);

}

async function createUser(email: string, password: string) {

  return await UserLogin.create({ email, password });

}

async function createUserData(
  userId: string,
  name: string,
  email: string,
  isCompany: boolean,
  isAdmin?: boolean,
  address?: object,
  userDescription?: string,
  userTechnologies?: object[],
  cnpj?: string,
) {
  const res = await UserData.create(
    {
      userId, name, address, isAdmin, isCompany, userDescription,
      userTechnologies, cnpj, email
    }
  );
  return res;
}

async function updateUser(_id, email, password) {
  const res = await UserLogin.updateOne(
    { _id }, { email, password }); return res;
}

async function updateUserData(
  userId: string,
  name: string,
  email: string,
  address: object,
  isCompany: boolean,
  isAdmin: boolean,
  userDescription: string,
  userTechnologies: object[],
  cnpj: string
) {
  const res = await UserData.updateOne(
    { userId },
    {
      userId, name, email, address, isAdmin, isCompany, userDescription,
      userTechnologies, cnpj
    }
  );
  return res;
}

async function listUserData(userId: string) {
  return await UserData.findOne({ userId }).lean();
}

async function addAppliedJob(userId: string, jobId: string) {
  return await UserApplications.updateOne({ userId },
    {
      $push: { applicationJobsId: jobId }
    }
  );
}

async function listUserAppliedJobs(userId: string) {
  return await UserApplications.findOne({ userId });
}

async function deleteAll() {
  return await UserData.deleteMany({});
}

export {
  listUserByEmail, listUsers, createUser, listUserById, listUser,
  createUserData, listUserData, deleteAll, updateUserData, updateUser,
  deleteUser, addAppliedJob, listUserAppliedJobs
};
