'use strict';
//require('dotenv').config({ path: '../.env' })
const { faker } = require('@faker-js/faker');
const {
    setPerson, getPersons, getPerson,
} = require('../data/index');
const {getConnection, getConnectionUrlSync} = require('../data/connection')
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;




describe('Data Tests', () => {
    before(async () => {

    });
    it('Can connect to DB', async () => {
        const connection = await getConnection();
        expect(connection).to.be.an('object');
        connection.disconnect();

    }).timeout(5000);

    it('Can create Person to DB', async () => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.firstName();

        await setPerson({firstName,lastName})
            .catch(e => {
                console.error(e)
            });
        const persons = await getPersons()
        expect(persons).to.be.an('array');
        const person = await getPerson(persons[0].id.toString())
            .catch(e => {
                console.error(e);
            })
        expect(person).to.be.an('object');
        expect(person.id).to.eq(persons[0].id.toString());

    }).timeout(5000);

})
