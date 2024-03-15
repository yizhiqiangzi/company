// 产品数据接口[企业官网]
var express = require('express');
const ProductController = require('../../controllers/web/ProductController');
var ProductRouter = express.Router();

ProductRouter.get("/webapi/product/list",ProductController.getList)// 获取产品数据

module.exports = ProductRouter