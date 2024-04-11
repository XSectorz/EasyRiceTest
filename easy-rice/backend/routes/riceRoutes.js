const express = require('express')
const router = express.Router();

const { getAllData, createData, getDataByID, getDataByDateRange, deleteData,updateData } = require('../controllers/riceControllers')

router.route('/').get(getAllData);
router.route('/create').post(createData);
router.route('/history/:id').get(getDataByID);
router.route('/history/:id').delete(deleteData);
router.route('/history').get(getDataByDateRange);
router.route('/history/:id').put(updateData);

module.exports = router;