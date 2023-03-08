import { Router } from 'express';

import jwtVerify from './useCases/token/jwtVerify';

// import LoginController from './controllers/LoginController';
import NotificationController from './controllers/NotificationController';
// import TokenController from './controllers/TokenController';

import UserController from './controllers/UserController';
import CategoryController from './controllers/CategoryController';
import JobController from './controllers/JobController';

export const router = Router();

// deprecated -> migrated to firebase authentication
// router.post('/login', LoginController.login);
// router.post('/logout', LoginController.logout);
// router.get('/token/refresh-token', TokenController.refreshToken);

// user routes
router.get('/user-data', jwtVerify, UserController.listUserData);
router.patch('/user-data', jwtVerify, UserController.updateUserData);
router.post('/new-user', UserController.createUser);
router.get('/user', jwtVerify, UserController.listUser);



// router.patch('/user', jwtVerify, UserController.updateUser);

// router.get('/users', UserController.listUsers);

// router.post('/user-data', jwtVerify, UserController.createUserData);

// router.delete('/user', UserController.deleteUser);
// user only for development purpose
// router.delete('/user-data', jwtVerify, UserController.deleteAll);

// notifications routes
// router.get('/notifications', jwtVerify, NotificationController.listUserNotifications);
// router.get('/notifications/all', jwtVerify, NotificationController.listAllNotifications);
// router.post('/notification', jwtVerify, NotificationController.createNotification);
// router.delete('/notifications', jwtVerify, NotificationController.deleteAll);


// category routes
// router.post('/category', jwtVerify, CategoryController.createCategory);
// router.get('/categories', jwtVerify, CategoryController.listCategories);
// router.delete('/category', jwtVerify, CategoryController.deleteCategory);


// job routes
router.get('/jobs', JobController.listJobs);
router.post('/job', jwtVerify, JobController.createJob);
router.get('/job-details', JobController.listJobDetails);
router.post('/apply', jwtVerify, JobController.applyForJob);
router.get('/company-registered-jobs', jwtVerify, JobController.listCompanyRegisteredJobs);
router.get('/user-applied-jobs', jwtVerify, JobController.listUserAppliedJobs);
router.get('/users-by-job', jwtVerify, JobController.listUsersByJob);



router.delete('/job', jwtVerify, JobController.deleteJob);





