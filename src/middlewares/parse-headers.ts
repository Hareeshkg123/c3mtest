/**
 * Middleware for parsing applicaiton specific request headers into local variables
 */

import { CgmLogger as logger } from 'cm-commons/utils';
import { Request, Response, NextFunction } from 'express';

import CGMError, { CGMErrorTypes } from 'cm-commons/error';

/**
 * Checks for presence of expected headers and stores the values into local
 * variables. Trigger error flow if mandatory header(s) are missing.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const parseHeaders = (req: Request, res: Response, next: NextFunction): any => {
    if (req.header('Requested-By')) {
        res.locals.requestedBy = req.header('Requested-By');
        //NOTE: Could add a check be added to confirm that the requested user
        //      is a valid active user who exists in users collection?
        next();
    } else {
        logger.error(`Missing mandatory header Requested-By`);
        next(new CGMError(CGMErrorTypes.BAD_REQUEST, `Missing mandatory header Requested-By`));
    }
}

export default parseHeaders;
