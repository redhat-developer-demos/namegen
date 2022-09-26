const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const person = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    created: {
        type: Date,
        default: Date.now
    }
});

person.plugin(mongooseLeanVirtuals);

const Person = mongoose.model('Person', person);
module.exports = { Person};
