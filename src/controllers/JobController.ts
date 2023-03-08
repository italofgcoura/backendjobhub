import * as repository from '../useCases/job';
import * as userRepository from '../useCases/user';

import { recoverUserFromToken } from '../useCases/token/recoverUserFromToken';

import sleep from '../utils/sleep';
// import { IJob, IJobs } from '../interfaces/jobInterfaces';
import { IUserData } from '../interfaces/userInterfaces';

class JobController {

  async listJobs(request: any, response: any) {

    await sleep(1000);

    try {
      const jobs = await repository.listJobs();

      if (request?.headers?.authentication) {
        const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

        const returnedJobs = jobs.map((item: any) => {

          item.applied = false;

          if (item.candidates) {
            if ((item.candidates?.findIndex((i: string) => i === userDataFromToken.id)) !== -1) {
              item.applied = true;
            }
          }

          return item;

        });

        return response.status(200).send(returnedJobs);
      }


      if (jobs) {
        return response.status(200).send(jobs);
      }

      return response.send(404).send('Jobs not found');
    } catch (error) {

      response.sendStatus(500);
    }
  }

  async createJob(request: any, response: any) {
    const { companyName, title, seniority, description, wage, contact, startDeadLine } = request.body;

    await sleep(1500);

    if (!companyName || !title || !seniority || !description) {
      return response.status(400).send({ error: 'Missing required field' });
    }

    if (description.length < 140) {
      return response.status(400).send({ error: 'Description field must have at least 140 characters' });
    }

    try {

      const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

      const jobCreated = await repository.createJob(
        userDataFromToken.id,
        companyName, title, seniority, description, wage, contact, startDeadLine
      );

      return response.status(201).send(jobCreated);

    } catch (error) {
      console.log(error);
      return response.sendStatus(500);
    }
  }

  async updateJob(request: any, response: any) {
    const { jobId } = request.body;

    await sleep(2000);

    if (!jobId) {
      return response.status(400).send({ error: 'Missing required field' });
    }

    try {

      const userDataFromToken: any = recoverUserFromToken(request.headers['authorization']);

      const jobRecovered = await repository.listJob(jobId);

      if (jobRecovered) {

        const jobToUpdate = jobRecovered.candidates ?
          { ...jobRecovered, candidates: [...jobRecovered.candidates, userDataFromToken.id] }
          :
          { ...jobRecovered, candidates: [userDataFromToken.id] };

        const jobUpdated = await repository.updateJob(jobId,
          jobToUpdate
        );

        // await userRepository.addAppliedJob(userDataFromToken.id, jobId);

        return response.status(200).send(jobUpdated);

      }

      return response.status(400).json({ error: 'Vaga não encontrada' });

    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }

  async deleteJob(req, res) {

    const { id } = req.params;

    const deleted = await repository.deleteJob(id);

    if (deleted.acknowledged) {
      return res.sendStatus(204);
    }

    return res.sendStatus(500);

  }

  // list jobs that user applied
  async listUserAppliedJobs(request, response) {

    await sleep(1500);

    try {
      const userDataFromToken: any = recoverUserFromToken(request.headers['authorization']);

      const userJobs = await repository.listUserJobs(userDataFromToken.id);

      // interface iJob {
      //   candidates: string[];
      //   companyName?: string | undefined;
      //   companyId?: string | undefined;
      //   title?: string | undefined;
      //   seniority?: string | undefined;
      //   description?: any;
      //   wage?: number | undefined;
      //   contact?: string | undefined;
      //   startDeadLine?: string | undefined;
      // }

      // // recover list of applied id jobs
      // const appliedUserJobsIds = await userRepository.listUserAppliedJobs(userDataFromToken.id);

      // const userJobs: iJob[] = [];



      // // recover each job informations
      // if (appliedUserJobsIds) {
      //   appliedUserJobsIds.applicationJobsId.forEach(async (item) => {

      //     const temp = await repository.listJob(item);
      //     if (temp) {
      //       userJobs.push(temp);
      //     }
      //   });
      // }

      return response.status(200).json(userJobs);

    }
    catch (error) {
      return response.status(500).json({ error: error });
    }
  }

  // list all jobs registered by the company
  async listCompanyRegisteredJobs(request, response) {
    try {
      const userDataFromToken: any = recoverUserFromToken(request.headers['authorization']);

      const jobs = await repository.listCompanyJobs(userDataFromToken.id);

      return response.status(201).json(jobs);
    } catch (error) {
      return response.status(500);
    }
  }

  async listJobDetails(request, response) {

    await sleep(1500);

    try {

      console.log(request.query);

      const { jobId } = request.query;

      console.log('jobId', jobId);

      const jobDetails = await repository.listJob(jobId);

      console.log('jobDetails', jobDetails);

      return response.status(200).json(jobDetails);

    } catch (error) { return response.status(500).json(error); }
  }

  // list all users that applied for a job
  async listUsersByJob(request, response) {
    try {

      const { jobId } = request.query;



      const job = await repository.listJob(jobId);



      const users: IUserData[] = [];

      if (job) {
        // job.candidates.forEach(async (candidate) => {
        //   const temp = await userRepository.listUserData(candidate);

        //   if (temp) {
        //     users.push(temp);

        //   }
        // });

        for (const candidate of job.candidates) {
          const temp = await userRepository.listUserData(candidate);

          if (temp) { users.push(temp); }
        }

        return response.status(200).json(users);
      }

      return response.status(204);

    } catch (error) {

      return response.status(500).json(error);
    }
  }
}

export default new JobController();
