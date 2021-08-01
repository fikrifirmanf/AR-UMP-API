const FeedbackModel = require('../models/feedback.model')

module.exports = {
    getAll: async (req, res) => {
        try {
            const data = await FeedbackModel.find()
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
            const data = await FeedbackModel.findById(req.params.id)
            if (data.length == null) {
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
            const data = await FeedbackModel.find({
                typeFeedback: req.params.id
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
        const body = new FeedbackModel({
           
            nim: req.body.nim,
            name: req.body.name,
            typeFeedback:req.body.typeFeedback,
            content: req.body.content,
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
        const dataBuilding = await FeedbackModel.findById(req.params.id)
        const body = {
            nim: req.body.nim == null ? dataBuilding.nim : req.body.nim,
            name: req.body.name == null ? dataBuilding.name : req.body.name,
            typeFeedback: req.body.typeFeedback == null ? dataBuilding.typeFeedback : req.body.typeFeedback,
            content: req.body.content == null ? dataBuilding.content : req.body.content,
            
        }

        try {
            if (dataBuilding != null) {
                await FeedbackModel.findByIdAndUpdate(req.params.id, body)
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
            await FeedbackModel.findByIdAndDelete(req.params.id)
            res.json({message: 'Deleted successfully'})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}