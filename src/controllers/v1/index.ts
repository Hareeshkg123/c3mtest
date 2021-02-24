/**
 * Main router which inturn routes to specific routes
 */

import { Router } from 'express';


import userController from './user';

const router: Router = Router();


router.use('/user', userController);

export default router;