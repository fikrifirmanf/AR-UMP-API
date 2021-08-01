const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        validate: {
            isAsync: true,
            validator: function (value, isValid) {
                const self = this;
                return self.constructor.findOne({
                        username: value
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
            message: 'Username sudah ada'
        },
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    
    userType: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

// Hash sebelum save
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

module.exports = mongoose.model("Users", userSchema);