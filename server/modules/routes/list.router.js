const express = require('express');
const router = express.Router();
const listcontroller = require('../controllers/list.controller');

router.get('/', listcontroller.get);
router.post('/', listcontroller.post);
router.delete('/', listcontroller.delete);

module.exports = router;