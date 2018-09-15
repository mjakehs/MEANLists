const Task = require('../models/task.model');

exports.get = (req, res) => {
    List.find({}).then((results)  => {
        res.send(results);
    }).catch( (error) => {
        console.log('Error: ', error);
        res.sendStatus(500);
    })
}

exports.post = (req, res) => {
    List.create(req.body).then((results)  => {
        res.sendStatus(200);
    }).catch( (error) => {
        console.log('Error: ', error);
        res.sendStatus(500);
    })
}

exports.delete = (req, res) => {
    console.log(req.query);
    List.findByIdAndRemove(req.query._id).then((results)  => {
        res.sendStatus(200);
    }).catch( (error) => {
        console.log('Error: ', error);
        res.sendStatus(500);
    })
}