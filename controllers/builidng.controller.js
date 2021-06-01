const BuildingModel = require('../models/building.model')

module.exports = {
    getAll: async (req, res) => {
        try {
            const data = await BuildingModel.find()
            if (data.length > 0) {
                res.json({
                    status: res.statusCode,
                    data: data
                })
            } else {
                res.json({
                    message: "No data available"
                })
            }

        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    },
    getById: async (req, res) => {
        try {
            const data = await BuildingModel.findById(req.params.id)
            if (data.length > 0) {
                res.json({
                    status: res.statusCode,
                    data: data
                })
            } else {
                res.json({
                    message: "No data available"
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    },
    getByType: async (req, res) => {
        try {
            const data = await BuildingModel.find({
                typeBuilding: req.params.id
            })
            if (data.length > 0) {
                res.json({
                    status: res.statusCode,
                    data: data
                })
            } else {
                res.json({
                    message: "No data available"
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    },
    create: async (req, res) => {
        const body = new BuildingModel({
            uniqueName: req.body.uniqueName,
            name: req.body.name,
            desc: req.body.desc,
            lat: req.body.lat,
            long: req.body.long,
            typeBuilding: req.body.typeBuilding,
            imgurl: req.body.imgurl,
        })
        console.log(body)
        try {
            const data = await body.save();
            res.status(201).json({
                status: res.statusCode,
                message: "Created successfully",
                data: data
            })

        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    },
    update: async (req, res) => {
        const dataBuilding = await BuildingModel.findById(req.params.id)
        const body = {
            uniqueName: req.body.uniqueName == null ? dataBuilding.uniqueName : req.body.uniqueName,
            name: req.body.name == null ? dataBuilding.name : req.body.name,
            desc: req.body.desc == null ? dataBuilding.desc : req.body.desc,
            lat: req.body.lat == null ? dataBuilding.lat : req.body.lat,
            long: req.body.long == null ? dataBuilding.long : req.body.long,
            typeBuilding: req.body.typeBuilding == null ? dataBuilding.typeBuilding : req.body.typeBuilding,
            imgurl: req.body.imgurl == null ? dataBuilding.imgurl : req.body.imgurl,
        }

        try {
            if (dataBuilding != null) {
                await BuildingModel.findByIdAndUpdate(req.params.id, body)
                res.json({
                    status: res.statusCode,
                    message: "Updated successfully",
                    data: body
                })
            } else {
                res.json({
                    message: "Cannot find id"
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    },
    delete: async(req,res)=>{
        try {
            await BuildingModel.findByIdAndDelete(req.params.id)
            res.json({message: 'Deleted successfully'})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}