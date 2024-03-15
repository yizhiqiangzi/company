//进行数据的增删改查

const UserModel = require("../../models/UserModel")

 const UserService ={
  login:async({username,password})=>{//这儿相当于把req.body解构成username,password
    return UserModel.find({ //在UserModel里面查找这两个属性
      username,
      password
    })
  },

  upload:async({_id,username,introduction,gender,avatar}) =>{
    if(avatar){//对应光改名字，改其他，而不该头像，那么req.file的值就为空的情况，如果连头像啥的全都改了，就没啥事
      return UserModel.updateOne({
        _id
      },{//下划线id是它的时候，就把底下每一个都更新了
        username,introduction,gender,avatar
      })
    }else{//对应光改名字，改其他，而不该头像，那么req.file的值就为空，那么数据库就不修改avatar
      return UserModel.updateOne({
        _id
      },{//下划线id是它的时候，就把底下每一个都更新了
        username,introduction,gender,
      })
    }
  },

  //添加用户
  add:async({username,introduction,gender,avatar,password,role})=>{//这儿相当于把req.body解构成username,password
    return UserModel.create({ //在UserModel里面插入这几个属性
      username,introduction,gender,avatar,password,role
    })
  },

  //获取用户列表
  getList:async({id})=>{
    return id?UserModel.find({_id:id},["username","role","password","introduction"])
    :UserModel.find({},["username","role","avatar","introduction","gender"])  //find的括号为空就是取出来所有的
  },
  
  // 删除用户列表信息
  delList:async({_id})=>{
    return UserModel.deleteOne({_id})  
  },

  //更新用户列表
  putList:async(body)=>{
    return UserModel.updateOne({_id:body._id},body)  //根据_id把这一项找出来，然后再更新后面的
  },




}

module.exports = UserService