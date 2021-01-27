import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

//import { CgmLogger as logger } from 'cm-commons/utils';
//import { buildError } from 'cm-commons/error';

/**
 * Error response middleware for 404 not found.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
export function notFoundError(req: Request, res: Response, next: NextFunction): void {
    res.status(HttpStatus.NOT_FOUND).json({
        error: {
            code: HttpStatus.NOT_FOUND,
            message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
        }
    });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 *
 * @param {*} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function genericErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (err.stack) {
        logger.debug('Error stack trace: ', err.stack);
    }

    const error = buildError(err);

    res.status(error.code).json({ error });
}