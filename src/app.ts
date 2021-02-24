
/**
 * Starts the  api services 
 */

import 'babel-polyfill';
import * as express from 'express';
import * as fs from 'fs';
import * as helmet from 'helmet';
import { json } from 'body-parser';
import * as https from 'https';
import * as path from 'path';
import { Request, Response } from 'express';

// import { CgmLogger, CgmConfig } from 'cm-commons/utils';

//import * as Auth from './middlewares/auth';
import CgmDB from './utils/db';
// import * as errorHandler from './middlewares/error-handler';
// import parseHeaders from './middlewares/parse-headers';
import v1 from './controllers/v1';


/**
 * Method that starts the micro service
 * @returns {Promise<void>}
 */
async function startService(): Promise<void> {
    try {
        // const config: any = CgmConfig.all();
        // const { port, environment } = config.app;
        const app: express.Express = express();
        app.use(json());
        app.use(helmet());

        // CgmLogger.init(app, environment, config.logging);
        // CgmLogger.debug('Debug logs are enabled');

        // Initialize Basic Authentication
        //Auth.init();

        app.get('/heartbeat', (req: Request, res: Response) => {
            res.sendStatus(200);
        });

        // API Routes
        app.use('/v1', v1);

        // Error Middlewares
        // app.use(errorHandler.genericErrorHandler);
        // app.use(errorHandler.notFoundError);

        //Create and run express server
        // const { keyFile, certFile } = config.server;
        const httpsOptions = {
            // key: fs.readFileSync(path.resolve(keyFile)),
            // cert: fs.readFileSync(path.resolve(certFile))
        };
        // https.createServer(httpsOptions, app).listen(8000, () => {
        //     console.log(`Listening on port ${8080} `);
        // });
         app.listen(3000,()=> {
            console.log('server connected on port 3000');
    
})
        // Setup connection to DB
        try {
            await new CgmDB().connect();
        } catch(err) {
            console.error(`Error connecting to DB.`);
            process.exit(-1);
        }
    } catch(err) {
        console.error(`Error starting dummy node api services microservice`);
        process.exit(-1);
    }
}

startService();