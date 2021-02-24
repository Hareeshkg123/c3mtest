/**
 * Controller for  User APIs
 */

import { Router, Request, Response, NextFunction } from 'express';

import { UserService } from '../../../services/user';

const router: Router = Router();

/** 
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
router.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    try {
        res.json(await UserService.get(email));
    } catch (err) {
        res.json({Error:err.message});
        next(err);
    }
});

export default router;