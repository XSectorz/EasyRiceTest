const asyncHandler = require('express-async-handler')
const standardData = require('../models/standard')

const getAllData = asyncHandler(async (req,res) => {
    const dataList = await standardData.find();
    console.log(dataList.length);
    res.status(200).json(dataList);
});

const getAllName = asyncHandler(async (req, res) => {
    const dataList = await standardData.find();
    const formattedData = dataList.map(item => ({
        id: item.id,
        name: item.name
    }));
    res.status(200).json(formattedData.reverse());
});

const createData = asyncHandler(async (req,res) => {
    try {
        const data = req.body;

        await standardData.create(data);
        return res.status(200).json({"message" : "Create Successfully"})

    } catch(err) {
        console.log(err)
    }
});

const deleteAllData = asyncHandler(async (req,res) => {
    await standardData.deleteMany( { } );

    return res.status(200).json({ message: `Deleted all data!`})
}) 

module.exports = { getAllData, createData, deleteAllData , getAllName}