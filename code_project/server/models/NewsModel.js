

//1.把mongoose引入进来
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//2.用mongoose.model（）方法创建模型    user模型 ——>对应 users集合   以后用user模型来操作集合
// mongoose.model("user")

//3.schema来限制模型
const NewsType = {
  // _id: mongoose.Schema.Types.ObjectId, // 添加 _id 字段
  title:String,
  content:String,
  category:Number,  //类别  1，2，3
  cover:String,    //封面
  isPublish:Number,    //未发布，已发布
  editTime:Date    //编辑时间
}
const NewsModel = mongoose.model("news",new Schema(NewsType))  

module.exports = NewsModel  //导出去