const mongoose = require('mongoose')

const BuildingSchema = new mongoose.Schema({
    uniqueName: {
        type: String,
        required: true,
        
    },
    name : {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: function (value, isValid) {
                const self = this;
                return self.constructor.findOne({
                        name: value
                    })
                    .exec(function (err, user) {
                        if (err) {
                            throw err;
                        } else if (user) {
                            if (self.id === user.id) { // if finding and saving then it's valid even for existing email
                                return isValid(true);
                            }
                            return isValid(false);
                        } else {
                            return isValid(true);
                        }

                    })
            },
            message: 'Gedung sudah ada'
        },
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
    imgurl : {
        type: String
    },
    wakeUpArea: {
        type: Number
    },
    dateBuild: {
        type: String
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