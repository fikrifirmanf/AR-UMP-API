const mongoose = require('mongoose')

const BuildingSchema = new mongoose.Schema({
    uniqueName: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    imgurl: {
        type: String,
        
    },
    typeBuilding: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Building', BuildingSchema)