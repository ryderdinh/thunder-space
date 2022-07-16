const { io } = require("../src/app")
const jwt = require("jsonwebtoken");
const Staff = require("../src/models/Staff")
let room = null;
io.use( async(socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token){
      const user = await Staff.findOne({ 'tokens.token' : socket.handshake.query.token });
      if(!user) return next(new Error("Authenticate token error"))
      room = user.id
        jwt.verify(socket.handshake.query.token,  process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
            if (err) return next(new Error('Authentication error'));
        });
      next();
    }else{
      next(new Error('Authentication error'));
    }
}).on("connection", function(socket){
    socket.join(room)
})