//在这个文件中，我们会把所有的跟这个模型相关的路由都配置在这里

// 1.创建路由
var express = require('express'); //引入express
const NewsController = require('../../controllers/admin/NewsController');
var NewsRouter = express.Router();//创建好路由对象

const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })   //文件尽量放在静态资源文件夹下

//涉及文件上传，普通的post不行，需要加上 multer 中间件
NewsRouter.post("/adminapi/news/add",upload.single('file'),NewsController.add)//表示前端想进行post请求来添加新闻
NewsRouter.get("/adminapi/news/list",NewsController.getList)
NewsRouter.get("/adminapi/news/list/:id",NewsController.getList)
NewsRouter.post("/adminapi/news/list",upload.single('file'),NewsController.updateList)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)
NewsRouter.delete("/adminapi/news/list/:id",NewsController.delList)

module.exports = NewsRouter