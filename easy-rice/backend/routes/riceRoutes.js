const express = require('express')
const router = express.Router();

const { getAllData, createData, getDataByID } = require('../controllers/riceControllers')

router.route('/').get(getAllData);
router.route('/create').post(createData);
router.route('/search/data').get(getDataByID);


module.exports = router;