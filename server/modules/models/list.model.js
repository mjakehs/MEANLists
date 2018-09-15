const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: {type: String, required: true, unique: true}
})

const List = mongoose.model('list', listSchema);

module.exports = List;