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

const queryData = async (inspectionID, fromDate, toDate, pages) => {
    let params = {};
    let dataList;

    if (inspectionID) {
        params['inspectionID'] = inspectionID;
    }

    if (fromDate) {
        params['createDate'] = { ...params['createDate'], $gte: fromDate };
    }

    if (toDate) {
        params['createDate'] = { ...params['createDate'], $lte: toDate };
    }
    try {
        const aggregatePipeline = [];

        if (Object.keys(params).length > 0) {
            aggregatePipeline.push({
                $match: params
            });
        }

        aggregatePipeline.push({
            $facet: {
                totalCount: [
                    {
                        $count: "total"
                    }
                ],
                paginatedData: [
                    { $skip: 10 * (pages - 1) },
                    { $limit: 10 }
                ]
            }
        });

        const result = await riceData.aggregate(aggregatePipeline);

        const totalCount = result[0].totalCount[0]?.total || 0;
        const paginatedData = result[0].paginatedData;

        //console.log(totalCount);
        //console.log(paginatedData);

        return {
            totalCount,
            paginatedData
        };
    } catch (error) {
        console.error(error);
        return []; 
    }
};

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
        
        dataList = await queryData(inspectionID,fromDate,toDate,pages);

        return res.status(200).json({
            data: dataList.paginatedData,
            startIndex: 10*(pages-1),
            endIndex:  10*(pages-1)+dataList.paginatedData.length,
            dataSize: dataList.totalCount
        });

    } catch(err) {
        console.log(err);
    }
});

const deleteData = asyncHandler(async (req,res) => {
    try {

        const dataID = req.params.id;
        const deleteDataID = await riceData.findByIdAndDelete(dataID);

        if(!deleteDataID) {
            return res.status(404).send(`Data ID not found!`);
        }

        res.status(200).send({
            message: `Deleted ${dataID} from database`
        });

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


module.exports = { getAllData, createData, getDataByID, getDataByDateRange , deleteData}