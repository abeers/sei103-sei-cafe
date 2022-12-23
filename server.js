const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')

require('dotenv').config()
require('./config/database')

const app = express()

app.use(logger('dev'))
// there's no need to mount express.urlencoded middleware
// why is that?
app.use(express.json())
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))

// Check if token and create req.user
app.use(require('./config/checkToken'))

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))
// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn')
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'))
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'))

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

module.exports = app

// // Configure to use port 3001 instead of 3000 during
// // development to avoid collision with React's dev server
// const port = process.env.PORT || 3001

// app.listen(port, function () {
//   console.log(`Express app running on port ${port}`)
// })

// const createError = require('http-errors')
// const express = require('express')
// const path = require('path')
// const cookieParser = require('cookie-parser')
// const logger = require('morgan')
// const methodOverride = require('method-override')


// // // view engine setup
// // app.set('views', path.join(__dirname, 'views'))
// // app.set('view engine', 'ejs')


// app.use(cookieParser())
// app.use(methodOverride('_method'))

// app.use(function (req, res, next) {
//   res.locals.user = req.user
//   next()
// })

// const isLoggedIn = require('./config/auth')

// app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', indexRouter)
// app.use('/servants', servantsRouter)
// app.use('/', isLoggedIn, reviewsRouter)

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404))
// })

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

// module.exports = app