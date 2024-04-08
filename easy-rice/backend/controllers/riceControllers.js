const asyncHandler = require('express-async-handler')
const riceData = require('../models/rice')

const getAllData = asyncHandler(async (req,res) => {
    const dataList = await riceData.find();
    console.log(dataList.length);
    res.status(200).json(dataList);
});

const getDataByID = asyncHandler(async (req,res) => {
    try {
        const inspectionID  = req.params.id

        let dataList;

        dataList = await riceData.find({'inspectionID': inspectionID});
        
        //console.log("ID: " + inspectionID)

        return res.status(200).json(dataList);
    } catch(err) {
        console.log(err)
    }
});

const getDataByDateRange = asyncHandler(async (req,res) => {
    try {

        const { inspectionID, fromDate, toDate, pages} = req.query;

        let dataList;

        let fromDateObj;
        let toDateObj;

        if(fromDate && fromDate !== "") {
            fromDateObj = new Date(fromDate).toISOString()
        }
        if(toDate && toDate !== "") {
            toDateObj = new Date(toDate).toISOString(); 
        }
        
        if(toDate || fromDate || inspectionID) {
           // console.log("This Case2");

           /* if(inspectionID) {
                console.log("inspectionID != null");
            }
            if(fromDate) {
                console.log("fromDate != null");
            }
            if(toDate) {
                console.log("toDate != null");
            }*/

            if(inspectionID && fromDate && toDate) {
                dataList = await riceData.find({
                    'inspectionID': inspectionID,
                    'createDate': { $gte: fromDateObj, $lte: toDateObj}
                });
            } else if (!inspectionID && fromDate && toDate) {
                dataList = await riceData.find({
                    'createDate': { $gte: fromDateObj, $lte: toDateObj}
                });
            } else if (!inspectionID && !fromDate && toDate) {
                dataList = await riceData.find({
                    'createDate': { $lte: toDateObj}
                });
            } else if (!inspectionID && fromDate && !toDate) {
                dataList = await riceData.find({
                    'createDate': { $gte: fromDateObj}
                });
            } else if (inspectionID && !fromDate && !toDate) {
                dataList = await riceData.find({
                    'inspectionID': inspectionID
                });
            } else if (inspectionID && fromDate && !toDate) {
                dataList = await riceData.find({
                    'inspectionID': inspectionID,
                    'createDate': { $gte: fromDateObj}
                });
            } else if (inspectionID && !fromDate && toDate) {
                dataList = await riceData.find({
                    'inspectionID': inspectionID,
                    'createDate': { $lte: toDateObj}
                });
            }
        } else {
           // console.log("This Case");
            dataList = await riceData.find();
        }

        const dataSize = dataList.length;
        const startIndex = (pages-1)*10;
        //console.log("DATA: ",dataList);
        //console.log("START INDEX: ",startIndex);
        //console.log("DATA SIZE: ",dataSize);
        if(startIndex > dataSize) { //if first index more than datasize = out of range
            return res.status(200).json({message: "Page Not Found!"});
        } else {

            if(startIndex+10 > dataSize) {
                //console.log("COME");
                return res.status(200).json({
                    data: dataList.slice(startIndex, dataSize),
                    startIndex: startIndex,
                    endIndex:  dataSize,
                    dataSize: dataSize
                });
            } else {
                //console.log("HERE");
                return res.status(200).json({
                    data: dataList.slice(startIndex, startIndex + 10),
                    startIndex: startIndex,
                    endIndex:  startIndex + 10,
                    dataSize: dataSize
                });
            }
        }

    } catch(err) {
        console.log(err);
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


module.exports = { getAllData, createData, getDataByID, getDataByDateRange }