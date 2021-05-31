const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
    authenticate: async function (req, res, next) {
         userModel.findOne({
                username: req.body.username,
            },
            function (err, userInfo) {
                if (err) {
                    next(err);
                } else {
                    console.log(userInfo)
                    if (userInfo == null) {
                        res.status(401).json({
                            status: "Unauthorized",
                            message: "Username atau password salah!",
                        });
                    } else if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({
                                id: userInfo._id,
                                name: userInfo.name,
                                username: userInfo.username,
                                userType: userInfo.userType,
                            },
                            process.env.JWT_SECRET_KEY, {
                                expiresIn: "2h",
                            }
                        );
                        res.json({
                            status: "success",
                            message: "user found!",
                            token: token,
                            id: userInfo._id,
                            user: {
                                userId: userInfo._id,
                                name: userInfo.name,
                                username: userInfo.username,
                                userType: userInfo.userType,
                            },
                        });
                    } else {
                        res.status(401).json({
                            status: "Unauthorized",
                            message: "Username atau password salah!",
                        });
                    }
                }
            }
        ).select("+password");
    },
    getByAgentType: async function (req, res, next) {
        try {
            const car = await userModel.find({
                userType: req.params.id
            }).select("+password");
            if (car == null) {
                return res.status(400).json({
                    message: "Cannot find transaction",
                });
            } else {
                return res.json({
                    data: car,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error,
            });
        }
        next();
    },
    getByUsername: async function (req, res, next) {
        try {
            const car = await userModel.find({
                username: req.params.id
            }).select("+password");
            if (car == null) {
                return res.status(400).json({
                    message: "Cannot find transaction",
                });
            } else {
                return res.json({
                    data: car,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error,
            });
        }
        next();
    },
    getAll: async function (req, res) {
        try {
            const users = await userModel.find().select("+password");
            res.json({
                data: users,
            });
        } catch (error) {
            res.status(500).json({
                message: error,
            });
        }
    },
    create: async function (req, res) {
        const user = new userModel({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            mobileNum: req.body.mobileNum,
            address: req.body.address,
            userType: req.body.userType,
        });
        try {
            const newUser = await user.save();
            res.status(201).json({
                message: "Created data successfully!",
                data: newUser,
            });
        } catch (error) {
            res.status(500).json({
                message: error,
            });
        }
    },
    update: async function (req, res) {
        const user = {
            name: req.body.name,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
            mobileNum: req.body.mobileNum,
            address: req.body.address,
            userType: req.body.userType,
        }
        try {
            await userModel.findByIdAndUpdate(req.params.id, user)
            res.json({
                message: 'Updated successfully!'
            })

        } catch (error) {
            res.status(400).json({
                message: error
            })
        }

    },
    getById: async function (req, res, next) {
        try {
            const user = await userModel.findById(req.params.id).select("+password");
            if (user == null) {
                return res.status(400).json({
                    message: "Cannot find user",
                });
            } else {
                return res.json({
                    data: user,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error,
            });
        }

        next();
    },
    delete: async function (req, res) {
        try {
            await userModel.findByIdAndRemove(req.params.id)
            res.json({
                message: 'Deleted successfully!'
            })

        } catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }
};