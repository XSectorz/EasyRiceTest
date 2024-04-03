const asyncHandler = require('express-async-handler')
const riceData = require('../models/rice')

const getAllData = asyncHandler(async (req,res) => {
    const dataList = await riceData.find();
    console.log(dataList.length);
    res.status(200).json(dataList);
});

const getDataByID = asyncHandler(async (req,res) => {
    try {
        const { inspectionID } = req.query

        let dataList;

        dataList = await riceData.find({'inspectionID': inspectionID});

        return res.status(200).json(dataList);
    } catch(err) {
        console.log(err)
    }
});

const createData = asyncHandler(async (req,res) => {
    try {
        const data = req.body;

        await riceData.create(data);
        return res.status(200).json({"message" : "Create Successfully"})

    } catch(err) {
        console.log(err)
    }
});


module.exports = { getAllData, createData, getDataByID }