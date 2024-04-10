const asyncHandler = require('express-async-handler');
const grainsData = require('../models/grains');

const getAllData = asyncHandler(async (req,res) => {
    const dataList = await grainsData.find();
    res.status(200).json(dataList);
});

const getDataByID = asyncHandler(async (req,res) => {
    try {
        const requestID  = req.params.id

        let dataList;

        dataList = await grainsData.find({'requestID': requestID});
        
        //console.log("ID: " + inspectionID)

        if(dataList.length == 0) {
            return res.status(404).json(dataList);
        }

        return res.status(200).json(dataList);
    } catch(err) {
        console.log(err)
    }
});

const createData = asyncHandler(async (req,res) => {
    try {
        const data = req.body;

        await grainsData.create(data);
        return res.status(200).json({"message" : "Create Successfully"})

    } catch(err) {
        console.log(err)
    }
});

module.exports = { getAllData , createData , getDataByID }