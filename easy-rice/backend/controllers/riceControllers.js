const asyncHandler = require('express-async-handler')
const riceData = require('../models/rice')

const getAllData = asyncHandler(async (req,res) => {
    const dataList = await riceData.find();
    console.log(dataList.length);
    res.status(200).json(dataList);
});

const createData = asyncHandler(async (req,res) => {
    try {
        const data = req.body;

        const dataCreate = await riceData.create(data);
        return res.status(200).json({"message" : "Create Successfully"})

    } catch(err) {
        console.log(err)
    }
});


module.exports = { getAllData, createData }