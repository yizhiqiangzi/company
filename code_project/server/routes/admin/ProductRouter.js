//在这个文件中，我们会把所有的跟这个模型相关的路由都配置在这里

// 1.创建路由
var express = require('express'); //引入express
const ProductController = require('../../controllers/admin/ProductController.js');
var ProductRouter = express.Router();//创建好路由对象

const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })   //文件尽量放在静态资源文件夹下

//涉及文件上传，普通的post不行，需要加上 multer 中间件
ProductRouter.post("/adminapi/product/add",upload.single('file'),ProductController.add)
ProductRouter.get("/adminapi/product/list",ProductController.getList)
ProductRouter.get("/adminapi/product/list/:id",ProductController.getList)
ProductRouter.post("/adminapi/product/list",upload.single('file'),ProductController.updateList)
// NewsRouter.put("/adminapi/news/publish",NewsController.publish)
ProductRouter.delete("/adminapi/product/list/:id",ProductController.delList)

module.exports = ProductRouter