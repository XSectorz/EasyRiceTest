const mongoose = require('mongoose');

const grainsSchema = mongoose.Schema({

    requestID: {
        type: String
    },
    imageURL: {
        type: String
    },
    grains: [{
        length: {
            type: Number
        },
        weight: {
            type: Number
        },
        shape: {
            type: String
        },
        type: {
            type: String
        }
    }]

});

module.exports = mongoose.model('grains',grainsSchema);
