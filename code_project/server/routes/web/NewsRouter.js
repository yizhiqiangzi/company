var express = require('express');
const NewsController = require('../../controllers/web/NewsController');
var NewsRouter = express.Router();




NewsRouter.get("/webapi/news/list",NewsController.getList)// 获取已发布的新闻数据
NewsRouter.get("/webapi/news/list/:id",NewsController.getList)
NewsRouter.get("/webapi/news/toplist",NewsController.getTopList)



module.exports = NewsRouter