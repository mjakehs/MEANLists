const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {type: String, required: true, unique: true},
    due: {type: Date, required: true, unique: false},
    complete: {type: Boolean, required: true, default: false},
    category: {type: String, required: false, unique: false},
    memberlist: {type: String, required: true, default: 'Main'}
})

const Task = mongoose.model('task', taskSchema);

module.exports = Task;