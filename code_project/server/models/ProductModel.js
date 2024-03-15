

//1.把mongoose引入进来
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//2.用mongoose.model（）方法创建模型    user模型 ——>对应 users集合   以后用user模型来操作集合
// mongoose.model("user")

//3.schema来限制模型
const ProductType = {
  // _id: mongoose.Schema.Types.ObjectId, // 添加 _id 字段
  title:String,
  introduction:String,
  detail:String,
  cover:String,    //封面
  editTime:Date    //编辑时间
}
const ProductModel = mongoose.model("product",new Schema(ProductType))  

module.exports = ProductModel  //导出去