const mongoose = require('mongoose');

const standardDataSchema = mongoose.Schema({
    key: String,
    minLength: Number,
    maxLength: Number,
    shape: {
        type: [String],
        required: true
    },
    name: String,
    conditionMin: {
        type: String,
        enum: ['GE', 'LE', 'GT', 'LT', 'EQ', 'NE']
    },
    conditionMax: {
        type: String,
        enum: ['GE', 'LE', 'GT', 'LT', 'EQ', 'NE']
    }
});

const standardSchema = mongoose.Schema({
    name: String,
    id: String,
    createDate: Date,
    standardName: String,
    standardData: [standardDataSchema]
});

module.exports = mongoose.model('Standard', standardSchema);