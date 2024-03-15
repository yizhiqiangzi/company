const NewsService = require("../../services/web/NewsService")

const NewsController = {
    // 获取已经发布了的新闻数据列表
    getList:async (req,res)=>{
        const result =await NewsService.getList({_id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
    },

    getTopList:async (req,res)=>{
        const result =await NewsService.getTopList({limit:req.query.limit})
        res.send({
            ActionType:"OK",
            data:result
        })
    },

  
}


module.exports = NewsController