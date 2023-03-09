import { PrismaClient } from '@prisma/client';
import { IJob } from '../interfaces/jobInterfaces';
import { IUserData } from '../interfaces/userInterfaces';

const prisma = new PrismaClient();

import { Job } from '../models/Job';
import sleep from '../utils/sleep';

async function listJob(jobId: string) {

  return await prisma.job.findFirst({ where: { id: jobId } });

}

async function listJobs() {

  return await prisma.job.findMany();

}

async function deleteJob(id: string) {
  return await Job.deleteOne({ id });
}

async function createJob(
  companyName: string,
  companyId: string,
  title: string,
  seniority: string,
  description: string,
  benefits: string,
  requirements: string,
  wage: number,
  contact: string,
  startDeadLine: string
) {

  return await prisma.job.create({
    data: {
      companyName, companyId, title, seniority, description, benefits, requirements, wage, contact, startDeadLine
    }
  });

}



async function applyForJob(
  jobId: string,
  userId: string
) {
  return await prisma.application.create({
    data: { userId, jobId }
  });
}

async function listUserJobs(userId: string) {

  const applied = await prisma.application.findMany({ where: { userId: userId } });

  if (!applied) { return []; }

  const jobs: IJob[] = [];

  for (const item of applied) {

    const temp = await prisma.job.findFirst({ where: { id: item.jobId } });
    if (temp) {
      jobs.push(temp);
    }
  }

  return jobs;

}

async function listCompanyJobs(userId: string) {
  await sleep(1500);

  return await prisma.job.findMany({
    where: {
      companyId: userId
    }
  });

}

async function listUsersByApplication(applications: any) {

  const user: IUserData[] = [];

  for (const item of applications) {
    const temp = await prisma.user.findFirst({ where: { id: item.userId } });
    if (temp) {
      user.push(temp);
    }

  }

  return user;

}

async function listApplications(jobId: string) {
  return await prisma.application.findMany({
    where: {
      jobId: jobId
    }
  });
}

async function listApplicationsAndUser(jobId: string, userId: string) {
  return await prisma.application.findFirst({
    where: {
      AND: [
        { jobId: jobId },
        { userId: userId }
      ]
    }
  });
}

export {
  createJob,
  listJobs,
  deleteJob,
  listJob,
  applyForJob,
  listUserJobs,
  listCompanyJobs,
  listApplications,
  listUsersByApplication,
  listApplicationsAndUser
};
