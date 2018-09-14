const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {type: String, required: true, unique: false},
    due: {type: Date, required: true, unique: false},
    complete: {type: Boolean, required: true, default: false},
    categoryOne: {type: String, required: false, unique: false},
    categoryTwo: {type: String, required: false, unique: false},
    categoryThree: {type: String, required: false, unique: false}
})

const Task = mongoose.model('task', taskSchema);

module.exports = Task;