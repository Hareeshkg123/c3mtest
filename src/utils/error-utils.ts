/**
 * Utility providing error processing methods.
 */

/**
 * Method that processes axios error by matching known error codes and
 * messages to return more meaningful error messages for easier debugging.
 * NOTE: Returns error in case error does match known error codes/messages
 * @param {any} err
 * @returns {any}
 */
const processAxiosError = (err: any): any => {
    if (err.code === 'ECONNREFUSED') {
        return `Error connecting to sevice. Possibly service is not running or is running at a different port.`;
    } else if (err.code === 'ENOTFOUND') {
        return `Error connecting to service. Could not resolve host name.`;
    } else if (err.code === 'ETIMEDOUT') {
        return `Error connecting to service. Could not reach server with IP address/hostname.`;
    } else if (err.code) {
        return `Error code: ${err.code}`;
    } else {
        if (err.response) {
            try {
                return `Error status: ${err.response.status} ` +
                        `Error details: ${JSON.stringify(err.response.data)}`;
            } catch (jsonError) {
                return err;
            }
        } else {
            return err;
        }
    }
}

/**
 * Method that processes mongo error by matching known error codes and
 * messages to return more meaningful error messages for easier debugging.
 * NOTE: Returns error in case error does match known error codes/messages
 * @param {any} err
 * @returns {any}
 */
const processMongoError = (err: any): any => {
    if (err.name === 'MongoNetworkError' && err.message.indexOf('failed to reconnect after') > -1) {
        return `Connection to database lost. Possible change in ip address or hostname or port.`;
    } else if (err.name === 'MongoError' && err.message.indexOf('Topology was destroyed') > -1) {
        return `Connection to database lost. Possible change in ip address or hostname or port.`;
    } else if (err.name === 'MongoError' && err.message.indexOf('requires authentication') > -1) {
        return `Connection to database lost. Possible missing or incorrect or changed authentication credentials.`;
    } else if (err.name === 'ValidationError') {
        return `Validation errors encountered. ${JSON.stringify(err.errors)}`;
    } else if (err.code && err.code === 11000) {
        //NOTE: Error is not logged on purpose, as this may result
        //      in sensitive data printed into the log files
        return `Duplicate data error encountered.`;
    } else {
        try {
            return JSON.stringify(err) === '{}' ? err.toString() : JSON.stringify(err);
        } catch (jsonError) {
            return err;
        }
    }
}

export default { processAxiosError, processMongoError };