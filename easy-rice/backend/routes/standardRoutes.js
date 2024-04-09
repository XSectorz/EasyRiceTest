const express = require('express')
const router = express.Router();

const { getAllData, createData , deleteAllData, getAllName } = require('../controllers/standardControllers')

router.route('/standard').get(getAllName);
router.route('/standard/all').get(getAllData);
router.route('/standard/create').post(createData);
router.route('/standard/deleteall').delete(deleteAllData);

module.exports = router;