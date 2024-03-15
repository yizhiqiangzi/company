

//1.把mongoose引入进来
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//2.用mongoose.model（）方法创建模型    user模型 ——>对应 users集合   以后用user模型来操作集合
// mongoose.model("user")

//3.schema来限制模型
const UserType = {
  // _id: mongoose.Schema.Types.ObjectId, // 添加 _id 字段
  username:String,
  password:String,
  gender:Number,  //性别  0，1，2
  introduction:String,    //简介
  avatar:String,    //头像
  role:Number    //角色  管理员1，编辑2
}
const UserModel = mongoose.model("user",new Schema(UserType))  

module.exports = UserModel  //导出去