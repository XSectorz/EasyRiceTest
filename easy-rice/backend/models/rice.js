const mongoose = require('mongoose')

const riceSchema = mongoose.Schema({
    name: {
        type: String,
    },
    createDate: {
        type: Date,
    },
    inspectionID: {
        type: String,
    },
    standardID: {
        type: String,
    },
    note: {
        type: String,
    },
    standardName: {
        type: String,
    },
    samplingDate: {
        type: Date,
    },
    samplingPoint: {
        type: [String],
    },
    price: {
        type: Number,
    },
    imageLink: {
        type: String,
    },
    standardData: {
        type: [{
            key: {
                type: String,
            },
            minLength: {
                type: Number,
            },
            maxLength: {
                type: Number,
            },
            shape: {
                type: [String],
                require: true
            },
            name: {
                type: String,
            },
            conditionMin: {
                type: String,
                enum: ['GE', 'LE', 'GT', 'LT', 'EQ', 'NE']
            },
            conditionMax: {
                type: String,
                enum: ['GE', 'LE', 'GT', 'LT', 'EQ', 'NE']
            },
            value: {
                type: Number,
            }
        }],
        require: true
    }
});

module.exports = mongoose.model('rices',riceSchema);