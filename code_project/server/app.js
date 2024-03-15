var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./util/JWT');
const NewsRouter = require('./routes/admin/NewsRouter')
const ProductRouter = require('./routes/admin/ProductRouter')
const webNewsRouter = require('./routes/web/NewsRouter')
const webProductRouter = require('./routes/web/ProductRouter')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(webNewsRouter)   //不用像后端一样去做接口校验
app.use(webProductRouter)   //不用像后端一样去做接口校验

//这里的两句是一级二级路径
app.use('/', indexRouter);
app.use('/users', usersRouter);


/*
将来我希望我定制的接口是这样一对接口的，我会分为两类接口
一类接口是adminapi   给后台系统用的   格式都是/adminapi/*
另一类接口是webapi   给企业官网用的接口   格式都是/webapi/*
*/

//前端发送过来验证token   这儿弄一个中间件，如果不调用next的话，那么后面就不会执行
app.use((req,res,next)=>{
  //如果token，就next()放行
  //如果token过期了，返回401错误
  if(req.url === "/adminapi/user/login"){//如果是登录界面，就直接放行，因为登录界面是去查询数据库，由数据了才能登进去，而只要登进去之后才能才会有token
    next()
    return;
  }

  //剩下的页面之间，就要先取出token
  const token = req.headers["authorization"].split(" ")[1]
  if(token){
    var payload = JWT.verify(token)
    console.log(payload);
    if(payload){//token有效的话，重新生成一个token，无效的话，返回一个401错误
      const newToken = JWT.generate({
        _id:payload.id,
        username:payload.username
      },"1d")
      res.header("Authorization",newToken)
      return next()
    }else{
      return res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
  }
  next()
})

// UserRouter写的挺好，但是没注册，所以我们在app.js中进行注册调用
app.use(UserRouter)//由于我们不需要写一级二级路径，所以直接注册,调用
app.use(NewsRouter)
app.use(ProductRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
