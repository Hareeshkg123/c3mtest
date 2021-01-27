/**
 * Controller for all dummy APIs
 */

import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../../../services/user';



const router: Router = Router();

/**
 * Get dummy list
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
router.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    try {
        res.json(await UserService.get(email));
    } catch (err) {
        next(err);
    }
});

export default router;