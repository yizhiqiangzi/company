// 产品数据接口[企业官网]
const ProductService = require("../../services/web/ProductService")

const ProductController = {
    // 产品数据获取,解析请求参数
    getList:async (req,res)=>{
        const result =await ProductService.getList({_id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
    }

}

module.exports = ProductController