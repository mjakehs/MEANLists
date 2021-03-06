const Task = require('../models/task.model');

exports.get = (req, res) => {
    Task.find(req.query).then((results)  => {
        res.send(results);
    }).catch( (error) => {
        console.log('Error: ', error);
        res.sendStatus(500);
    })
}

exports.post = (req, res) => {
    Task.create(req.body).then((results)  => {
        res.sendStatus(200);
    }).catch( (error) => {
        console.log('Error: ', error);
        res.sendStatus(500);
    })
}

exports.put = (req, res) => {
    Task.findByIdAndUpdate(req.body._id, req.body).then((results)  => {
        res.sendStatus(200);
    }).catch( (error) => {
        console.log('Error: ', error);
        res.sendStatus(500);
    })
}

exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.query._id).then((results)  => {
        res.sendStatus(200);
    }).catch( (error) => {
        console.log('Error: ', error);
        res.sendStatus(500);
    })
}

exports.deleteByListName = (req, res) => {
    Task.deleteMany(req.query).then((results)  => {
        res.sendStatus(200);
    }).catch( (error) => {
        console.log('Error: ', error);
        res.sendStatus(500);    
    })
}