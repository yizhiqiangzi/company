

const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")

//导入jwt
// require("../../util/JWT")

//实质是一个函数，拿到数据，处理加工

//拿到前端的数据，进行分析拆解，拆解完之后送给service进行处理，处理完之后我们再决定给前端返回什么
const UserController = {
  login: async (req, res) => {

    //检测前端能否传来信息
    

    //前端发过来的用户名和密码，我们用req.body就能接收到     接收到之后，我们就应该进行数据库的验证查询工作了
    //在这里进行模型验证，查询的话，代码又会很多
    var result = await UserService.login(req.body)  //把req.body送给service层     

    //这儿也相当于调用service层得login函数login(req.body),函数执行后，会返回来一个值（也就是包含用户名和密码的数组） ，这个值被存到result中

    if (result.length === 0) {//查询出来，会返回一个数组，再看数组长度
      res.send({//给前端发送
        code: "-1",
        error: "用户名密码不匹配"
      })
    } else {
      //如果登录成功了，就应该在send之前，生成token
      const token = JWT.generate({   //之前引入过了，所以现在把require("../../util/JWT")删了
        _id:result[0]._id,
        username:result[0].username
      },"1d")
      res.header("Authorization",token)    //我们往前端传header,是Authorization（授权的意思），这个单词写成什么都行，不过推荐写Authorization

      res.send({
        ActionType: "ok",
        //登录成功之后，除了密码不返回，其他都需要返回给前端，然前端存到vuex中
        data:{
          username:result[0].username,
          gender:result[0].gender?result[0].gender:0,   //性别  0，1，2      //0也就是保密的意思
          introduction:result[0].introduction,    //简介
          avatar:result[0].avatar,    //头像
          role:result[0].role    //角色  管理员1，编辑2
        }
      })
    }
  },

  //upload  个人中心，表单上传模块
  upload:async (req, res) => {
    console.log('接收的到的用户修改数据:',req.body,req.file)
    const {username,introduction,gender} = req.body
    // console.log(req,"信息", req.file)
    // const avatar = `/avataruploads/${req.file.filename}`
    const avatar = req.file?`/avataruploads/${req.file.filename}`:""


    //把这些信息存入数据库   调用service 模块 更新 数据
    //因为给来的这些信息中没有 ——id  ,所以做不了 所以从token中去取
    const token = req.headers["authorization"].split(" ")[1]
    var payload = JWT.verify(token)
    // console.log(payload._id);
    
    await UserService.upload({_id:payload._id,username,introduction,
      gender:Number(gender),avatar})  //注意：这儿的gender要为数字类型，而前端传给我们的是字符串类型，所以我们可以小小的转换一下

      if(avatar){
        res.send({
          ActionType:"ok",
          //成功之后也给前端把这些信息扔回去
          data:{
            username,introduction,gender:Number(gender),avatar
          }
        })
      }else{
        res.send({
          ActionType:"ok",
          //成功之后也给前端把这些信息扔回去
          data:{
            username,introduction,gender:Number(gender)
          }
    
        })
      }
  },

  //添加用户
  add:async (req, res) => {
    // console.log('接收的到的用户修改数据:',req.body,req.file)
    const {username,introduction,gender,role,password} = req.body
    // console.log(req,"信息", req.file)
    // const avatar = `/avataruploads/${req.file.filename}`
    const avatar = req.file?`/avataruploads/${req.file.filename}`:""

    
    await UserService.add({username,introduction,gender:Number(gender),avatar,role:Number(role),password}),  //注意：这儿的gender要为数字类型，而前端传给我们的是字符串类型，所以我们可以小小的转换一下
    
      res.send({
        ActionType:"ok"        //注意这儿，只发一个ok就行
      })
      
  },

  //获取用户列表
  getList:async (req, res) => {
      const result = await UserService.getList(req.params)
      res.send({
        ActionType:"ok",
        data:result
      })
  },

  //删除用户列表信息
  delList:async (req, res) => {
    // console.log(req.params.id);
    const result = await UserService.delList({_id:req.params.id})
      res.send({
        ActionType:"ok"
      })

  },

  //更新列表
  putList:async (req,res) =>{
    const result = await UserService.putList(req.body)
    res.send({
      ActionType:"ok"
    })
  }


}

module.exports = UserController  //导出去供路由层使用