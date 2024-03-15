const NewsModel = require("../../models/NewsModel")



const NewsService = {
  add:async ({title,content,category,cover,isPublish,editTime})=>{
    // console.log("数据库的模型处理");
    return NewsModel.create({
      title,content,category,cover,isPublish,editTime
    })

  },

  updatList:async ({_id,title,content,category,cover,isPublish,editTime})=>{
    if(cover){
      return NewsModel.updateOne({_id},{
        title,content,category,cover,isPublish,editTime
      })
    }else{
      return NewsModel.updateOne({_id},{
        title,content,category,isPublish,editTime
      })
    }
    
  },

  getList:async ({_id})=>{
    return _id?NewsModel.find({_id}) :NewsModel.find({})
  },

  // 发布新闻
  publish:async ({_id,isPublish,editTime})=>{
    return NewsModel.updateOne({
        _id
    },{
        isPublish,
        editTime
    })
},

  //删除新闻
  delList:async ({_id})=>{
    return NewsModel.deleteOne({
      _id
    })
  },

  


}

module.exports = NewsService