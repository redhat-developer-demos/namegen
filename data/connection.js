const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const {logger} = require("../logger");
//const projectDir = fs.realpathSync( process.cwd() + '../' )
require('dotenv').config({ path: path.join(process.cwd() , '.env') })
if (!process.env.MONGODB_URL)throw new Error('The required environment variable, MONGODB_URL does not exist or has no value');
const dbName = process.env.DB_NAME || 'namegen'

let connection;

const getConnection = async () => {
    if (!connection) {
        let mStr = process.env.MONGODB_URL;
        //if the last character is not a /, add one
        if( mStr.substr(mStr.length - 1) !== "/") {
            mStr = mStr + "/";
        }
        const url = `${mStr}${dbName}`;
        let conn;
        logger.info(`Attempting to connect at url: ${url}.`)
        conn = await mongoose.connect(url).catch(e =>{
            console.error(e);
            throw e;
        });
        connection = conn;
    }
    return connection
}

const closeConnection = async () => {
    if (connection) {
        const url = connection.url;
        logger.info(`Closing connection into ${url}`);
        connection.disconnect();
        logger.info(`Closed connection into ${url}`);
    }
}

const getConnectionUrlSync = () => {
    return `${process.env.MONGODB_URL}/${dbName}`;
};

module.exports = {getConnection, closeConnection, getConnectionUrlSync};

