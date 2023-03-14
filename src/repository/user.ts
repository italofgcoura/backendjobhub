import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUserByEmail(email: string) {
  return await prisma.user.findFirst({ where: { email: email } });
}

async function createUserData(
  id: string,
  name: string,
  email: string,
  isCompany: boolean,
  isAdmin?: boolean,
  description?: string,

) {
  const res = await prisma.user.create(
    {
      data: {
        id, name, email, isCompany, isAdmin, description
      }
    }
  );
  return res;
}

async function listUserData(userId: string) {
  return await prisma.user.findFirst({ where: { id: userId } });
}

async function updateUserData(
  id: string,
  name: string,
  email: string,
  isCompany: boolean,
  isAdmin?: boolean,
  description?: string,
) {
  const res = await prisma.user.update({
    where: { id: id },
    data: {
      id, name, email, isCompany, isAdmin, description
    }
  }
  );
  return res;
}

async function listUserById(id: string) {

  const user = await prisma.user.findFirst({ where: { id: id } });
  if (user) {
    return user;
  }
  return null;
}


// async function listUser(email: string, password: string) {
//   return await UserLogin.findOne({ email, password });
// }

// async function listUsers() {

//   return await UserLogin.find();

// }

// async function deleteUser(id: string) {

//   // const userData = await UserLogin.findById(id);

//   // return await UserLogin.deleteOne({ _id: id });


//   return await UserLogin.deleteMany();

// }



// async function createUser(email: string, password: string) {

//   return await UserLogin.create({ email, password });

// }

// async function createUserData(
//   userId: string,
//   name: string,
//   email: string,
//   isCompany: boolean,
//   isAdmin?: boolean,
//   address?: object,
//   userDescription?: string,
//   userTechnologies?: object[],
//   cnpj?: string,
// ) {
//   const res = await UserData.create(
//     {
//       userId, name, address, isAdmin, isCompany, userDescription,
//       userTechnologies, cnpj, email
//     }
//   );
//   return res;
// }

// async function updateUser(_id, email, password) {
//   const res = await UserLogin.updateOne(
//     { _id }, { email, password }); return res;
// }



// async function listUserData(userId: string) {
//   return await UserData.findOne({ userId }).lean();
// }

// async function addAppliedJob(userId: string, jobId: string) {
//   return await UserApplications.updateOne({ userId },
//     {
//       $push: { applicationJobsId: jobId }
//     }
//   );
// }

// async function listUserAppliedJobs(userId: string) {
//   return await UserApplications.findOne({ userId });
// }

// async function deleteAll() {
//   return await UserData.deleteMany({});
// }

export {
  listUserByEmail, createUserData, listUserData,
  updateUserData, listUserById
  //  listUsers, createUser, listUserById, listUser,
  //  listUserData, deleteAll, updateUserData, updateUser,
  // deleteUser, addAppliedJob, listUserAppliedJobs
};
