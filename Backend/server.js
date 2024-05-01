require('custom-env').env(process.env.NODE_ENV)
const express = require('express')
require('express-validator')
const session = require('express-session')

const bodyParser = require('body-parser')
var boolParser = require('express-query-boolean')
const path = require('path')
const morgan = require('morgan');
const fs = require('fs');
const cors = require("cors");

const apiRouter = require('./routers/api')
const logger = require('./logger')
const healthChecker = require('./healthChecker')
const mysqlDB = require('./services/databaseService')

const port = process.env.PORT
const app = express()

mysqlDB.initializeMySQL()

if (process.env.accessLog === "true") {
  // setup access logger
  const morganFormat = ':date[clf], :status, :response-time, :method, :url, :res[content-length]'
  var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  app.use(morgan(morganFormat, { stream: accessLogStream }))
}
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({}))
app.use(boolParser())
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  next();
});

app.use(cors())
app.options('*', cors())

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'cs411-service'
}))

app.use('/doc', express.static(path.join(__dirname, 'public/doc')))
app.use('/api', apiRouter)
console.log(__dirname)

app.use(express.static(path.resolve(__dirname, "build")));
      app.get("/", (req, res) => {
        res.sendFile(join(__dirname,'dist/index.html'));
      });

app.listen(port, () => {
  logger.info("http server is listening on port " + port)
})
// In azure, it was worked with below code
// app.set('port', port);
// var server = http.createServer(app);
// server.listen(port);
// server.on('listening', () => console.log("http server is listening on port " + port));