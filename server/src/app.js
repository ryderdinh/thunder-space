const express = require('express')
const app = express()
const server = require('http').Server(app)

const { Server } = require('socket.io')
const { instrument } = require('@socket.io/admin-ui')
const whilteList = JSON.parse(process.env.WHITE_LIST_CORS)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH']
    // credentials: true
  }
})
instrument(io, {
  auth: false,
  mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production'
})
app.set('socketio', io)
const db = require('../config/db/database')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')
const initializePassport = require('../config/passport/passport.config')
const cors = require('cors')
const fileupload = require('express-fileupload')
app.use(express.json({ limit: '10mb' }))
app.use(fileupload({ useTempFiles: true }))

//———————————————————————————VIEWS—————————————————————————————//
const { dirname } = require('path')
app.set('view engine', 'ejs')
app.set('views', 'views/MAIN/pages')
app.use(express.static(dirname(require.main.filename) + '/views/MAIN'))
app.use(express.urlencoded({ limit: '10mb', extended: false }))

//———————————————————————————INIT PASSPORT—————————————————————————————//
initializePassport(
  passport,
  (uname) => admins.find((admin) => admin.uname === uname),
  (id) => admins.find((admin) => admin.id === id)
)

app.use(flash())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.json())

//———————————————————————————CONNECT DATABASE—————————————————————————————//
require('../config/db/database')

//———————————————————————————ADMIN INFO—————————————————————————————//
const admins = [
  {
    id: '123123',
    uname: 'admin',
    psw: 'admin'
  }
]

//———————————————————————————CORS—————————————————————————————//
app.use(
  cors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH']
  })
)

//----------------------------------ADMIN CONTROLLER------------------------------------
// const loginAdmin = require("./app/controller/loginAdmin")
//ACCESS
const home = require('./controller/admin/access/getLogin')
const logoutAdmin = require('./controller/admin/access/logout')

//DASHBOARD
const dashBoard = require('./controller/admin/dashBoard/dashBoard')

//USER
const createUser = require('./controller/admin/users/createUser')
const postCreateUser = require('./controller/admin/users/postCreateUser')
const getUpdateUser = require('./controller/admin/users/getUpdateUser')
const postUpdateUser = require('./controller/admin/users/postUpdateUser')
const postDeleteUser = require('./controller/admin/users/postDeleteUser')
const getUserInfo = require('./controller/admin/users/getUserInfo')
const getUserFilter = require('./controller/admin/users/getUserFilter')

//EVENT
// const getUpdateEvent = require("./app/controller/admin/events/getUpdateEvent");
// const getEventInfo = require("./app/controller/admin/events/getEventInfo");
const postUpdateEvent = require('./controller/admin/events/postUpdateEvent')
const getCreateEvent = require('./controller/admin/events/getCreateEvent')
const postCreateEvent = require('./controller/admin/events/storeEvent')

//REPORT
const getReportInfo = require('./controller/admin/reports/getReportInfo')

//MIDDLE WARE
const checkAuthenticated = require('./middleware/admin/login/checkAuthenticated')
const checkNotAuthenticated = require('./middleware/admin/login/checkNotAuthenticated')
const authenticateToken = require('./middleware/user/login/authenticateToken')

//———————————————————————————USER ROUTES—————————————————————————————//

/* -------------------------------------------
                        ACCESS
---------------------------------------------*/
const routersAccess = require('./routers/users/access.router')

app.use('/api', routersAccess.apiPostToken)
app.use('/api', routersAccess.apiGetLogin)
app.use('/api', routersAccess.apiPutChangePassword)
app.use('/api', routersAccess.apiPostLogOutAll)
app.use('/api', routersAccess.apiPostLogOut)
app.use('/api', routersAccess.apiPostForgetPassword)
app.use('/api', routersAccess.apiPostResetPassword)
app.use('/api', routersAccess.apiPostVerifyOtp)

/* -------------------------------------------
                        INFOR
---------------------------------------------*/
const routersInfo = require('./routers/users/info.router')

app.use('/api', routersInfo.apiGetUserInfo)
app.use('/api', routersInfo.apiGetSearchUser)
app.use('/api', routersInfo.apiPutUploadAvatar)
app.use('/api', routersInfo.apiGetProfile)
/* -------------------------------------------
                        EVENT
---------------------------------------------*/
const routersEvent = require('./routers/users/event.router')

app.use('/api', routersEvent.apiGetEvent)

/* -------------------------------------------
                        ISSUE
---------------------------------------------*/
const routersIssue = require('./routers/users/issue.router')

app.use('/api', routersIssue.apiGetAllIssueInProject)
app.use('/api', routersIssue.apiGetOneIssueInProject)
app.use('/api', routersIssue.apiDeleteOneIssue)
app.use('/api', routersIssue.apiUpdateOneIssue)
app.use('/api', routersIssue.apiPostIssue)
app.use('/api', routersIssue.apiPostFile)
app.use('/api', routersIssue.getHistory)

/* -------------------------------------------
                        TIMEKEEPING
---------------------------------------------*/
const routersCheckin = require('./routers/users/checkin.router')

app.use('/api', routersCheckin.apiPutLocation)
app.use('/api', routersCheckin.apiGetTimeLine)
/* -------------------------------------------
                        STATISTIC
---------------------------------------------*/
// const apiGetTable = require("./controller/users/statistic/apiGetTable");

/* -------------------------------------------
                        REPORT
---------------------------------------------*/
const routersReport = require('./routers/users/report.router')

app.use('/api', routersReport.apiGetReport)
app.use('/api', routersReport.apiPostReport)

/* -------------------------------------------
                        PROJECT
---------------------------------------------*/
const routersProject = require('./routers/users/project.router')

app.use('/api', routersProject.apiGetProject)
app.use('/api', routersProject.apiPostProject)
app.use('/api', routersProject.apiGetFindProject)
app.use('/api', routersProject.apiDeleteProject)
app.use('/api', routersProject.apiPutUpdateProject)
app.use('/api', routersProject.apiPatchDeleteMemberOfProject)
app.use('/api', routersProject.apiPatchAddMemberToProject)

/* -------------------------------------------
                          NOTIFICATIONS
---------------------------------------------*/
const routersNotifications = require('./routers/users/notification.router')
app.use('/api', routersNotifications.apiGetNotifications)
//Event

/* -------------------------------------------
                        TASK
---------------------------------------------*/

const routersTask = require('./routers/users/task.router')
Object.entries(routersTask).forEach((e) => {
  app.use('/api', e[1])
})
// app.use('/api', routersTask.getTasks)

//———————————————————————————ADMIN ROUTES—————————————————————————————//

//ACCESS
app.use(home)
app.post(
  '/admin/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })
)
app.use('/admin', logoutAdmin)

//DASHBOARD
app.use('/admin', dashBoard)

//USER
app.use('/admin', createUser)
app.get('/admin/userInfo/update', checkAuthenticated, getUpdateUser)
app.use('/admin', checkAuthenticated, postUpdateUser)
app.use('/admin', postCreateUser)
app.use('/admin', getUserInfo)
app.use('/admin', postDeleteUser)
app.use('/admin', getUserFilter)

//EVENT
app.get('/admin/eventInfo', checkAuthenticated, getCreateEvent)
app.post('/admin/createEvent', checkAuthenticated, postCreateEvent)
app.use('/admin', postUpdateEvent)
// app.get("/admin/updateEvent", checkAuthenticated, getUpdateEvent);
// app.use("/admin", getEventInfo);

//REPORT
app.use('/admin', getReportInfo)

//———————————————————————————404 ROUTES—————————————————————————————//
app.use((req, res, next) => {
  res.status(404).render('404')
})

module.exports = { server, io }
// const Project = require('./app/models/project');
// const { exist } = require("joi");
//  const func = (async () => {
//     const existP = await Project.findById('619670e5e4df4a384069f323')
//   //  existP.getManagers()
//    existP.getNormalMembers()
//   // console.log(mem1);
//     const mem = await existP.populate('members').execPopulate()
//     console.log(mem.members);
// })()
// const multer = require('multer')
// const upload = multer({
//     dest : 'image',
//     limits : {
//       fieldSize : 1000
//     },
//     fileFilter(req, file, cb){
//         if(file.originalname.match(''))//use regex in match
//         return
//         cb(undefined, true)
//     }

// })
// app.post('/up', upload.single('upload'), (req, res) => {
//   res.send()
// })

// const Staff = require('./app/models/Staff')
// const func = (async () => {
//   const user = await Staff.findById('6196704ae4df4a384069f317')
//   const userP = await user.populate('projects').execPopulate()
//   console.log(userP.projects);
// })()
//----------------------------------CRON TAB------------------------------------
// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

// const shell = require("shelljs");
// const Status = require("./app/models/status")
// const Table = require("./app/models/TimeSheet")
// cron.schedule("* */22 * * *", function () {
//   Status.find({}, (err, status) => {
//     status.forEach(element => {
//       Table.findByIdAndUpdate(element._id, {
//         $push: {
//           "dateDetails": {
//             timeStart: element.timeStart,
//             timeEnd: element.timeEnd,
//             statusDay: element.statusDay,
//             date: Date.now()

//           }
//         }
//       },
//         { safe: true, upsert: true, new: true },
//         (err, table) => {

//         })
//     });
//   })
// })

// cron.schedule("* */23 * * *", function () {
//   Status.updateMany({
//     statusDay : "1",
//     timeStart : "",
//     timeEnd : "",
//     timeLine : []
//   }, (err, status) => {

//   })
// })

// app.get("/admin/update", checkAuthenticated, (req,res) => {
//   let idSearch = req.query.searchId;
//   console.log(idSearch);
//   res.render('updateUser', {
//     userInfo: idSearch,
//       path : '/admin/user-information'
//   });
// })
// app.get("/admin/updateEventElement", checkAuthenticated, (req,res) => {
//   let idSearch = req.query.searchId;
//   console.log(idSearch);
//   res.render('updateEvent', {
//     eventInfor: idSearch,
//     path : "/admin/event-information"

//   });
// })
// app.get('/admin/searchMember', checkAuthenticated, function(req, res){
//   var id = req.query.search;
//   StaffInformation.findById(id, (err,member) => {
//     res.render('user', {
//       user: member
//     });
//   })
// })

// app.get('/admin/searchMember', checkAuthenticated, function(req, res){
//   var email = req.query.search;
//   StaffInformation.find((err,members) => {
//     if (err){
//       console.log("Lỗi tìm kiếm, đối tượng tìm kiếm không tồn tại!");
//       res.render("userInformation");
//     }
//     var data = members.filter(function(item){
//       return item.email === email
//     });
//     let id = data[0].id;
//     StaffInformation.findById(id, (err,member) => {
//       if (err){
//         console.log("Lỗi tìm kiếm, đối tượng tìm kiếm không tồn tại!");
//         res.render("userInformation");
//       }
//       res.render('user', {
//         user: member
//       });
//     })
//   })
// })
