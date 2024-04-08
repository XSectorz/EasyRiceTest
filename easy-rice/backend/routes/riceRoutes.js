const express = require('express')
const router = express.Router();

const { getAllData, createData, getDataByID, getDataByDateRange } = require('../controllers/riceControllers')

router.route('/').get(getAllData);
router.route('/create').post(createData);
router.route('/history/:id').get(getDataByID);
router.route('/history').get(getDataByDateRange);


module.exports = router;