const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const generateData = require("./dataGenerate/data-manage");
const mongoose = require('mongoose');

require("./mongodb/models/user");
require("./mongodb/models/order");
require("./mongodb/models/car");
require("./mongodb/models/comment");


const cors = require('cors')

const app = express();
const dbConfig = require("./mongodb/dbConfig")

mongoose.connect(`mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.dbName}`,{
  useMongoClient: true,
});

const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const carRouter = require('./routes/car');
const commentRouter = require('./routes/comment');

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post('/initData',async (req, res)=>{
  await generateData();
  res.send("Init data success.");
});

userRouter(app);
orderRouter(app);
carRouter(app);
commentRouter(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
