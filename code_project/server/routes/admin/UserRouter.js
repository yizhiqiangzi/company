//在这个文件中，我们会把所有的跟这个模型相关的路由都配置在这里

// 1.创建路由
var express = require('express'); //引入express
var UserRouter = express.Router();//创建好路由对象
const UserController = require('../../controllers/admin/UserController')  //导入controllers层的UserController

//2.只要是/adminapi/user/login这样一个接口发过来得post请求，就会进到函数里  //而这个函数，我们准备交给controller来进行

//图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })   //文件尽量放在静态资源文件夹下

UserRouter.post("/adminapi/user/login",UserController.login)
UserRouter.post("/adminapi/user/upload",upload.single('file'),UserController.upload)   //获取到file对象，存到public/avataruploads这个文件加
UserRouter.post("/adminapi/user/add",upload.single('file'),UserController.add)   //获取到file对象，存到public/avataruploads这个文件加
//实现用户列表的增删改查
UserRouter.get("/adminapi/user/list",UserController.getList)   //增
UserRouter.get("/adminapi/user/list/:id",UserController.getList)   //改
UserRouter.put("/adminapi/user/list/:id",UserController.putList)   //更新
UserRouter.delete("/adminapi/user/list/:id",UserController.delList)   //删




module.exports = UserRouter;
