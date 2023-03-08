import { Job } from '../models/Job';
import sleep from '../utils/sleep';

async function listJob(jobId: string) {
  return await Job.findById(jobId).lean();
}

async function listJobs() {

  return await Job.find().lean();

}

async function deleteJob(id: string) {
  return await Job.deleteOne({ id });
}

async function createJob(
  companyId: string,
  companyName: string,
  title: string,
  seniority: string,
  description: object,
  wage: string,
  contact: string,
  startDeadLine: Date,
) {

  return await Job.create({
    companyId,
    companyName,
    title,
    seniority,
    description,
    wage,
    contact,
    startDeadLine,
  });

}



async function updateJob(
  jobId: string,
  jobToUpdate: any
) {
  const res = await Job.updateOne(
    { _id: jobId },
    jobToUpdate
  );
  console.log('res', res);
  return res;
}

async function listUserJobs(userId: string) {
  const res = await Job.find(
    { candidates: { $in: [userId] } },
  );

  return res;
}

async function listCompanyJobs(userId: string) {
  await sleep(1500);
  const res = await Job.find(
    { companyId: { $in: [userId] } },
  );

  return res;
}


export {
  createJob,
  listJobs,
  deleteJob,
  listJob,
  updateJob,
  listUserJobs,
  listCompanyJobs
};
