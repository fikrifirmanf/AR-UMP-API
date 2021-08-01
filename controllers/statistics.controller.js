const BuildingModel = require('../models/building.model')
const UserModel = require('../models/users.model')

module.exports = {
    getAllStat: async(req,res)=>{
        const BuildingData = await BuildingModel.find()
        const UserData = await UserModel.find()
        try {
            res.json({status: res.statusCode,data : {
                totalBuilding: BuildingData.length,
                totalUsers: UserData.length}
            })
        } catch (error) {
            res.status(500).json({message: `error, ${error}`})
        }
    }
}