const express = require('express')
const router = express.Router();

const { getAllData,createData,getDataByID } = require('../controllers/grainsControllers')

router.route('/grains').get(getAllData);
router.route('/grains/create').post(createData);
router.route('/grains/:id').get(getDataByID);

module.exports = router;