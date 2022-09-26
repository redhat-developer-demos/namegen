const express = require('express');
const {faker} = require('@faker-js/faker');
const app = express();
const path = require("path");
const {logger} = require("./logger");
const {setPerson, getPersons, getPerson,deletePersons, getConnection} = require('./data/index')
const {get} = require("mongoose");

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const names = [];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.SERVER_PORT || 8080;
const getRandomNameSync = () => {
    return {firstName: faker.name.firstName(), lastName: faker.name.lastName()}
};

app.get('/api/connection', async (req, res) => {
    logger.info(`Getting connection.`);
    const conn = await getConnection()
        .catch(e=> {
            logger.info(`Got connection info ${JSON.stringify(e.message)}`);
            res.status(500).send({message:e.message,more: process.env.MONGODB_URL});
        });
    const connectionInfo = {host: conn.connections["0"].host, port: conn.connections["0"].port, name:conn.connections["0"].name }
    logger.info(`Got connection info ${JSON.stringify(connectionInfo)}`);
    res.status(200).send({connectionInfo});
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/api/names', async (req, res) => {
    const name = req.body;
    await setPerson(name);
    logger.info(`Posting ${JSON.stringify(name)}`);
    res.status(200).send({status: 200, message: 'OK'});
});

app.get('/api/names', async (req, res) => {
    const msg = `Getting names`;
    logger.info(msg);
    const result = await getPersons();
    res.status(200).send(result);
});

app.delete('/api/names', async (req, res) => {
    const msg = `Deleting names`;
    logger.info(msg);
    const result = await deletePersons();
    res.status(200).send(result);
});

app.get('/api/names:id', async (req, res) => {
    const msg = `Getting name ${req.params.id}`;
    logger.info(msg);
    const result = await getPerson(req.params.id);
    res.status(200).send({firstName: result.firstName, lastName: result.lastName});
});
app.get('/api/random_name', (req, res) => {
    const randomName = getRandomNameSync()
    const msg = `Getting random name ${JSON.stringify(randomName)}`;
    logger.info(msg);
    res.status(200).send(randomName);
});

server = app.listen(port, () => {
    logger.info(`Node server is running on port ${port} at ${new Date()}`);
});
