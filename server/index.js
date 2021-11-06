// if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require("express");
const app = express();
const db = require("./config/db/database");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const initializePassport = require("./config/passport/passport.config");
const cors = require("cors");

const fileupload = require("express-fileupload");
app.use(express.json({ limit: "50mb" }));
app.use(fileupload({ useTempFiles: true }));
initializePassport(
  passport,
  (uname) => admins.find((admin) => admin.uname === uname),
  (id) => admins.find((admin) => admin.id === id)
);

//----------------------------------VIEW ENGINE------------------------------------

app.set("view engine", "ejs");
app.set("views", "views/MAIN/pages");
app.use(express.static(__dirname + "/views/MAIN"));
// app.use(express.static(path.join(__dirname, 'public')))
//Parser
app.use(express.urlencoded({ limit: "50mb", extended: false }));
// app.use(bodyParser.json())
// app.use(bodyParser.raw());

//----------------------------------INIT PASSPORT------------------------------------
app.use(flash());
app.use(
  session({
    secret:
      "98c00efe44d70207991595b328a8809a9ff45e04459f644b4a0442dcde979f97b20a86365da4fd213e87807138a44296aaeeb0a7b6ec8c9baca3cf181ee31478",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.json());

//----------------------------------CONNECT DATABASE------------------------------------
db.connect();

//----------------------------------ADMIN  INFO------------------------------------
const admins = [
  {
    id: "123123",
    uname: "admin",
    psw: "admin",
  },
];

//----------------------------------CORS------------------------------------
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

//----------------------------------ADMIN CONTROLLER------------------------------------
// const loginAdmin = require("./app/controller/loginAdmin")
//ACCESS
const home = require("./app/controller/admin/access/getLogin");
const logoutAdmin = require("./app/controller/admin/access/logout");

//DASHBOARD
const dashBoard = require("./app/controller/admin/dashBoard/dashBoard");

//USER
const createUser = require("./app/controller/admin/users/createUser");
const postCreateUser = require("./app/controller/admin/users/postCreateUser");
const getUpdateUser = require("./app/controller/admin/users/getUpdateUser");
const postUpdateUser = require("./app/controller/admin/users/postUpdateUser");
const postDeleteUser = require("./app/controller/admin/users/postDeleteUser");
const getUserInfo = require("./app/controller/admin/users/getUserInfo");
const getUserFilter = require("./app/controller/admin/users/getUserFilter");

//EVENT
// const getUpdateEvent = require("./app/controller/admin/events/getUpdateEvent");
// const getEventInfo = require("./app/controller/admin/events/getEventInfo");
const postUpdateEvent = require("./app/controller/admin/events/postUpdateEvent");
const getCreateEvent = require("./app/controller/admin/events/getCreateEvent");
const postCreateEvent = require("./app/controller/admin/events/storeEvent");

//REPORT
const getReportInfo = require("./app/controller/admin/reports/getReportInfo");

//MIDDLE WARE
const checkAuthenticated = require("./middleware/admin/login/checkAuthenticated");
const checkNotAuthenticated = require("./middleware/admin/login/checkNotAuthenticated");
const authenticateToken = require("./middleware/user/login/authenticateToken");

//———————————————————————————USER ROUTES—————————————————————————————//

/* -------------------------------------------
                        ACCESS
---------------------------------------------*/ 
const routesAccess = require("./app/routes/users/access.route");
const apiResetPassword = require("./app/controller/users/access/postResetPassword");
const apiNewPassword = require("./app/controller/users/access/postNewPassword");

app.use("/api", routesAccess.apiPostToken)
app.use("/api", routesAccess.apiGetLogin);
app.use("/api", routesAccess.apiPutChangePassword);

/* -------------------------------------------
                        INFOR
---------------------------------------------*/ 
const routesInfo = require("./app/routes/users/info.route");

app.use("/api", routesInfo.apiGetUserInfo);
app.use("/api", routesInfo.apiGetSearchUser);
app.use("/api", routesInfo.apiPutUploadAvatar);

/* -------------------------------------------
                        EVENT
---------------------------------------------*/ 
const routesEvent = require("./app/routes/users/event.route");

app.use("/api", routesEvent.apiGetEvent);

/* -------------------------------------------
                        ISSUE
---------------------------------------------*/ 
const routesIssue = require("./app/routes/users/issue.route")

app.use("/api", routesIssue.apiGetIssue)
app.use("/api", routesIssue.apiPostIssue);
app.use("/api", routesIssue.apiPostFile);

//TIMEKEEPING
const apiPostLocation = require("./app/controller/users/timeKeeping/location");
const apiGetTimeline = require("./app/controller/users/timeKeeping/storeTimeLine");


//STATISTIC
const apiGetTable = require("./app/controller/users/statistic/apiGetTable");

//REPORT
const apiPostReport = require("./app/controller/users/report/apiPostReport");
const apiGetReport = require("./app/controller/users/report/apiGetReport");


// PROJCECT
const apiPostProject = require("./app/controller/users/project/apiPostProject");
const apiGetProject = require("./app/controller/users/project/apiGetProject");
const apiSearchProject = require("./app/controller/users/project/apiSearchProject");


app.use("/api", apiPostLocation);
app.use("/storeTimeLine", authenticateToken, apiGetTimeline);
app.use("/table", authenticateToken, apiGetTable);
app.use("/user/report", authenticateToken, apiGetReport);
app.use("/user/storeReport", authenticateToken, apiPostReport);
//Event


//Project route
app.use("/api", apiGetProject);
app.use("/api", apiPostProject);
app.use("/api", apiSearchProject);




const testApi = require("./app/controller/admin/temp/testApi");
app.use(testApi)


//----------------------------------ADMIN ROUTE------------------------------------

//ACCESS
app.use(home);
app.post(
  "/admin/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/",
    failureFlash: true,
  })
);
app.use("/admin", logoutAdmin);

//DASHBOARD
app.use("/admin", dashBoard);

//USER
app.use("/admin", createUser);
app.get("/admin/userInfo/update", checkAuthenticated, getUpdateUser);
app.use("/admin", checkAuthenticated, postUpdateUser);
app.use("/admin", postCreateUser);
app.use("/admin", getUserInfo);
app.use("/admin", postDeleteUser);
app.use("/admin", getUserFilter);

//EVENT
app.get("/admin/eventInfo", checkAuthenticated, getCreateEvent);
app.post("/admin/createEvent", checkAuthenticated, postCreateEvent);
app.use("/admin", postUpdateEvent);
// app.get("/admin/updateEvent", checkAuthenticated, getUpdateEvent);
// app.use("/admin", getEventInfo);

//REPORT
app.use("/admin", getReportInfo);

//----------------------------------USER ROUTE------------------------------------


app.use((req, res, next) => {
  res.render("404");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

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

//App listen
