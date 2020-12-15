const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const  session = require('express-session');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const registerRouter = require('./routes/register');
const addVehicleRouter = require('./routes/addvehicle');
const registerDriverRouter = require('./routes/adddriver');
const recordCaseRouter = require('./routes/newcase');
const postNotificationRouter = require('./routes/postnotification');
const vehiclesRouter = require('./routes/vehicles');
const driversRouter = require('./routes/drivers');
const notificationsRouter = require('./routes/notifications');
const casesRouter = require('./routes/cases');
const logoutRouter = require('./routes/logout');
const approveNotificationRouter = require('./routes/approvenotification');
const makeAdminRouter = require('./routes/make-admin');
const reportsRouter = require('./routes/reports');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/register', registerRouter);
app.use('/new-vehicle', addVehicleRouter);
app.use('/new-driver', registerDriverRouter);
app.use('/new-case', recordCaseRouter);
app.use('/notify', postNotificationRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/drivers', driversRouter);
app.use('/cases', casesRouter);
app.use('/notifications', notificationsRouter);
app.use('/logout', logoutRouter);
app.use('/approve', approveNotificationRouter);
app.use('/make-admin',makeAdminRouter );
app.use('/reports',reportsRouter );
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
