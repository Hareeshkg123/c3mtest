/**
 * Contains logic for connecting to the underlying DB.
 */

import * as mongoose from 'mongoose';

// import { CgmLogger as logger, CgmConfig } from 'cm-commons/utils';

/**
 * Class that handles environment specific connection to the database
 */
export default class CgmDB {

    private dbUrl: string;
    private dbOptions: mongoose.ConnectionOptions = {};

    /**
     * Constructor
     */
    // constructor() {
    //     this.setUp();
    // }

    /**
     * Method that performs setup of connection options
     * @returns {void}
     */
    // private setUp() {
    //     // const config = CgmConfig.all();
    //     // const environment: string = config.app.environment;
    //     // const mongoConfig: any = config.mongo;

    //     // this.dbUrl = mongoConfig.dbUrl;
    //     // this.dbOptions.config = { autoIndex: false };

    //     if (['local', 'development'].indexOf(environment) === -1) {
    //         //enable communication over TLS channel
    //         // this.dbOptions.ssl = true;
    //         //authenticate when login to database. the database containing
    //         //credentials is different from to which access is requested
    //         // this.dbOptions.authSource = mongoConfig.authSource;
    //         // this.dbOptions.user = mongoConfig.username;
    //         // this.dbOptions.pass = mongoConfig.password;
    //     }

    //     if ('production' === environment) {
    //         //verify the certificate presented by database during TLS
    //         //but skip the server identify checking i.e. checking if
    //         //hostname matches the DN in the certificate presented.
    //         //NOTE:Because of a schema version difference between the
    //         //mongoose and @types/mongoose library, which makes them
    //         //incomptabile, the options for server certificate validation
    //         //has to be provided through the 'server' options, rather
    //         //than than directly by setting the 'sslValidate' option
    //         /* TODO: HTTPS connection to Mongo
    //         dbOptions.server = {
    //             checkServerIdentity: false,
    //             sslValidate: true,
    //             sslCA : fs.readFileSync(path.resolve(mongoConfig.caCertFile))
    //         };*/
    //         // TODO: These Options has to be deleted once the server option is added
    //         // this.dbOptions.ssl = true;
    //         // this.dbOptions.authSource = mongoConfig.authSource;
    //         // this.dbOptions.user = mongoConfig.username;
    //         // this.dbOptions.pass = mongoConfig.password;
    //     }

    //     //Add to remove deprecation warning and to use new url parser
    //     this.dbOptions = Object.assign(this.dbOptions, { useNewUrlParser: true });
    // }

    /**
     * Method that prints the debug information for the DB connection established
     * @param {typeof mongoose} mongoDB
     * @returns {void}
     */
    // private printDebugInfo = (mongoDB: typeof mongoose): void => {
    //     setInterval(() => {
    //         logger.info('Current pool size is ' + (<any>mongoDB.connection.db.serverConfig).poolSize);
    //     }, 500);
    // }

    /**
     * Method to connect to the database.
     * @returns {Promise<typeof mongoose>}
     */
    public connect(): Promise<typeof mongoose> {
        return mongoose.connect('mongodb://127.0.0.1:27017/test').then((mongoDB: typeof mongoose) => {
            console.log(`Successfully connected to mongodb.`);
            //NOTE: uncomment the following line when needed for debugging
            //this.printDebugInfo(mongoDB);
            return mongoDB;
        }).catch((err: any) => {
                    console.log(err);
                    
            throw err;
        });
    }

}