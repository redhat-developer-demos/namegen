const {logger} = require("../logger");
const {getConnection} = require('./connection');
const {Person} = require('./schemas');

const setPerson = async (objPerson) => {
    // const url = getConnectionUrlSync();
    const conn = await getConnection()
    logger.info({message: `Setting person at ${new Date()}`});
    const person = new Person();
    person.firstName = objPerson.firstName;
    person.lastName = objPerson.lastName;
    await person.save();
    logger.info({message: `Set person at ${new Date()}`});
    //await conn.connections[0].disconnect();
};

const getPersons = async () => {
    const conn = await getConnection()
    logger.info({message: `Getting Persons ${new Date}`});
    const items = await Person.find({}).lean({virtuals: true});
    logger.info({message: `Got Persons ${JSON.stringify(items)} at ${new Date()}`});
    //await conn.connections[0].disconnect();
    return items;
};

const getPerson = async (id) => {
    const conn = await getConnection()
    logger.info(`Getting Person by id: ${id}`);
    const item = await Person.findById(id).lean({virtuals: true});
    logger.info(`Got User by id: ${id} ${item} at ${new Date()}`);
    return item;
};

const deletePersons = async () => {
    const conn = await getConnection()
    logger.info(`Deleting all Persons}`);
    await Person.deleteMany({});
    logger.info(`All persons delete at ${new Date()}`)
};

module.exports = {setPerson, getPersons, getPerson,deletePersons, getConnection}
