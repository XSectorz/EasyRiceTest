const express = require('express')
const router = express.Router();

const { getAllData, createData } = require('../controllers/riceControllers')

router.route('/').get(getAllData);
router.route('/create').post(createData);


module.exports = router;