// if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require("express");
const app = express();
const db = require("./config/db");
const jwt = require("jsonwebtoken");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const initializePassport = require("./passport-config");
const cors = require("cors");
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
app.use(express.urlencoded({ extended: false }));
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
app.use(cors());
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "https://hrmapplication.herokuapp.com/");
  // res.header("Access-Control-Allow-Credentials", "true")
  // res.header("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//----------------------------------ADMIN CONTROLLER------------------------------------
// const loginAdmin = require("./app/controller/loginAdmin")
//ACCESS
const home = require("./app/controller/admin/access/getLogin");
const logoutAdmin = require("./app/controller/admin/access/logout");

//DASHBOARD
const dashBoard = require("./app/controller/admin/dashBoard/dashBoard");

//USER
const createUser = require("./app/controller/admin/users/createUser");
const storeUser = require("./app/controller/admin/users/storeUser");
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
const checkAuthenticated = require("./middleware/checkAuthenticated");
const checkNotAuthenticated = require("./middleware/checkNotAuthenticated");
const authenticateToken = require("./middleware/authenticateToken");

//----------------------------------USER CONTROLLER------------------------------------

//ACCESS
const loginUser = require("./app/controller/users/access/loginUser");
const loginToken = require("./app/controller/users/access/loginToken");
const changePassword = require("./app/controller/users/access/changePassword");

//INFOR
const apiGetUserInfo = require("./app/controller/users/info/apiGetUserInfo");

//TIMEKEEPING
const apiPostLocation = require("./app/controller/users/timeKeeping/location");
const apiGetTimeline = require("./app/controller/users/timeKeeping/storeTimeLine");

//EVENT
const apiGetEvent = require("./app/controller/users/event/apiGetEvent");

//STATISTIC
const apiGetTable = require("./app/controller/users/statistic/apiGetTable");

//REPORT
const apiPostReport = require("./app/controller/users/report/apiPostReport");
const apiGetReport = require("./app/controller/users/report/apiGetReport");

//----------------------------------ADMIN ROUTE------------------------------------

//ACCESS
app.get("/", checkNotAuthenticated, home);
app.post(
  "/admin/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/",
    failureFlash: true,
  })
  );
  app.get("/admin/logout", logoutAdmin);
  
  //DASHBOARD
  app.get("/admin/dashboard", checkAuthenticated, dashBoard);

//USER
app.get("/admin/createUser", checkAuthenticated, createUser);
app.post("/admin/storeUser", checkAuthenticated, storeUser);
app.get("/admin/userInfo/update", checkAuthenticated, getUpdateUser);
app.use("/admin/editUser", checkAuthenticated, postUpdateUser);
app.use(getUserInfo);
app.use(postDeleteUser);
app.use(getUserFilter);

//EVENT
app.get("/admin/eventInfo", checkAuthenticated, getCreateEvent);
app.post("/admin/createEvent", checkAuthenticated, postCreateEvent);
app.use("/admin", postUpdateEvent);
// app.get("/admin/updateEvent", checkAuthenticated, getUpdateEvent);
// app.use("/admin", getEventInfo);

//REPORT
app.use("/admin", getReportInfo);

//----------------------------------USER ROUTE------------------------------------
app.post("/loginToken", loginToken);
app.use("/location", authenticateToken, apiPostLocation);
app.use("/storeTimeLine", authenticateToken, apiGetTimeline);
app.use("/userInfo", authenticateToken, apiGetUserInfo);
app.get("/user/login", authenticateToken, loginUser);
app.get("/event", authenticateToken, apiGetEvent);
app.use("/table", authenticateToken, apiGetTable);
app.use("/user/report", authenticateToken, apiGetReport);
app.use("/user/storeReport", authenticateToken, apiPostReport);
app.use("/user/changePassword", authenticateToken, changePassword);

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
// const cron = require("node-cron")
// const shell = require("shelljs");
// const Status = require("./app/models/status")
// const Table = require("./app/models/tableOfWork")
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

// const axios = require('axios')

// async function getUser() {
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//     const map = await response.data.map(e => e = {
//       name : e.name,
//       email : e.email,
//       password : "123456",
//       birthday : "14/05/2001",
//       position : "fffff",
//      department : "fffff",
//      phonenumber : "1111111111"
//     })
//     return map
//   } catch (error) {
//     // console.error(error);
//   }
// }

// console.log(getUser());
// app.post("/test",(req, res, next) => {
//     getUser().then(data => {
//       StaffInformation.insertMany(data,{
//       },(err, staff) => {
//         console.log(err);
//       })
//     })

//   res.redirect("/")
// })

app.use((req, res, next) => {
  res.render("404");
});
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
