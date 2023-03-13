import * as jobRepository from '../repository/job';
import NotificationController from './NotificationController';
import { recoverUserFromToken } from '../useCases/token/recoverUserFromToken';

import sleep from '../utils/sleep';

class JobController {

  // list all jobs. If the user is logged in return also if the user applied
  // for the job or not
  async listJobs(request: any, response: any) {

    await sleep(1000);

    try {
      const jobs = await jobRepository.listJobs();

      if (request?.headers?.authorization) {
        const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

        const tempJobs: any = [];

        for (const item of jobs) {

          const temp = await jobRepository.listApplicationsAndUser(item.id, userDataFromToken.id);

          if (temp) {

            tempJobs.push({
              ...item,
              applicationId: temp.applicationId, companyRepply: temp.answer, applied: true
            });
          }
          else {
            tempJobs.push({
              ...item,
              applied: false
            });
          }

        }

        return response.status(200).send(tempJobs);
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
    const { companyName, title, seniority,
      description, benefits, requirements,
      wage, contact, startDeadLine } = request.body;

    await sleep(1500);

    if (!companyName || !title || !seniority || !description) {
      return response.status(400).send({ error: 'Missing required field' });
    }

    if (description.length < 140) {
      return response.status(400).send({ error: 'Description field must have at least 140 characters' });
    }

    try {

      const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

      const jobCreated = await jobRepository.createJob(
        companyName, userDataFromToken.id, title, seniority, description, benefits, requirements, wage, contact, startDeadLine
      );

      return response.status(201).send(jobCreated);

    } catch (error) {
      console.log(error);
      return response.sendStatus(500);
    }
  }

  async applyForJob(request: any, response: any) {
    const { jobId } = request.body;

    await sleep(2000);

    if (!jobId) {
      return response.status(400).send({ error: 'Missing required field' });
    }

    try {

      const userDataFromToken: any = recoverUserFromToken(request.headers['authorization']);

      const applied = jobRepository.applyForJob(
        jobId, userDataFromToken.id
      );

      return response.status(200).json({ meg: 'Candidatado com sucesso', applied });

    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }

  async listJobDetails(request, response) {

    await sleep(1500);

    try {

      const { jobId } = request.query;

      const jobDetails = await jobRepository.listJob(jobId);


      if (jobDetails) {

        if (request?.headers?.authorization) {
          const userDataFromToken = recoverUserFromToken(request.headers['authorization']);

          const temp = await jobRepository.listApplicationsAndUser(jobDetails?.id, userDataFromToken.id);

          if (temp) {
            jobDetails.applied = true;
          }
          else {
            jobDetails.applied = false;
          }

          return response.status(200).send({ ...jobDetails, applicationId: temp?.applicationId, companyRepply: temp?.answer });
        }
      }

      return response.status(200).json(jobDetails);

    } catch (error) { return response.status(500).json(error); }
  }

  // list jobs that user applied
  async listUserAppliedJobs(request, response) {

    await sleep(1500);

    try {
      const userDataFromToken: any = recoverUserFromToken(request.headers['authorization']);

      const userJobs = await jobRepository.listUserJobs(userDataFromToken.id);

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

      const jobs = await jobRepository.listCompanyJobs(userDataFromToken.id);

      if (jobs) {

        const tempJobs: any[] = [];

        for (const job of jobs) {
          const temp = await jobRepository.listApplications(job.id);

          if (temp) {
            tempJobs.push({ ...job, numberOfCandidates: temp.length });
          } else {
            tempJobs.push({ ...job, numberOfCandidates: 0 });
          }

        }

        return response.status(200).json(tempJobs);

      }

      return response.status(200).json(jobs);
    } catch (error) {
      return response.status(500);
    }
  }

  // list all users that applied for a job
  async listUsersByJob(request, response) {
    try {

      const { jobId } = request.query;

      const applications = await jobRepository.listApplications(jobId);

      const users = await jobRepository.listUsersByApplication(applications);

      return response.status(200).json({ users: users, jobId: jobId });

    } catch (error) {

      return response.status(500).json(error);
    }
  }

  async repplySingleApplication(request, response) {

    const { applicationId, applicationReply, selectedJobId, userId } = request.body;

    if (!applicationId || !applicationReply || !selectedJobId) {
      return response.status(400).json({ msg: 'Missing required field.' });
    }

    try {

      const applicationUpdated = await jobRepository.repplySingleJobApplications(applicationId, applicationReply);

      if (userId) {
        const text = 'Texto de teste de notificação';

        const newNotification = await NotificationController.createNotification(userId, selectedJobId, false, text);

        console.log('newNotification', newNotification);
      }

      return response.status(200).json({ msg: applicationUpdated });

    } catch (error) {
      console.log(error);
      return response.status(500).json({ error });
    }
  }

  async repplyAllJobApplications(request, response) {

    const { jobId, applicationReply } = request.body;

    if (!jobId || !applicationReply) {
      return response.status(400).json({ msg: 'Missing required field.' });
    }

    try {

      const applicationUpdated = await jobRepository.repplyAllJobApplications(jobId, applicationReply);

      return response.status(200).json({ msg: applicationUpdated });

    } catch (error) {
      console.log(error);
      return response.status(500).json({ error });
    }
  }




  // async deleteJob(req, res) {

  //   const { id } = req.params;

  //   const deleted = await repository.deleteJob(id);

  //   if (deleted.acknowledged) {
  //     return res.sendStatus(204);
  //   }

  //   return res.sendStatus(500);

  // }



}

export default new JobController();
