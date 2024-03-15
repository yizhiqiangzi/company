// 产品接口联通数据库
const ProductModel = require("../../models/ProductModel")

const ProductService = {
    // 获取产品数据
    getList:async ({_id})=>{
        return _id?ProductModel.find({_id}):ProductModel.find()
    },    
   
}

module.exports = ProductService