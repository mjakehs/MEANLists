const express = require('express');
const router = express.Router();
const taskcontroller = require('../controllers/task.controller');

router.get('/', taskcontroller.get);
router.post('/', taskcontroller.post);
router.put('/', taskcontroller.put);
router.delete('/', taskcontroller.delete);
router.delete('/listdelete', taskcontroller.deleteByListName);

module.exports = router;