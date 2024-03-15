
//引入jsonwebtoken
const jsonwebtoken = require("jsonwebtoken")
const secret = "qiang"   //密钥为“qiang”

const JWT = {
  //两个方法，一个是生成，一个是验证
  
  generate(value,expires){//生成token    value为具体加密内容       expiresIn:expires表示时效
    return jsonwebtoken.sign(value,secret,{expiresIn:expires})

  },
  verify(token){//验证token 
    try{
      return jsonwebtoken.verify(token,secret)
    }catch(e){
      return false
    }
  }
}

//验证token能不能用
// const token = JWT.generate({name:"kerwin"},"10s")
// console.log(JWT.verify(token));

// //本来token时效就是10秒，11秒之后取这个信息就会过期
// setTimeout(()=>{
//   console.log(JWT.verify(token));
// },3000)

module.exports = JWT