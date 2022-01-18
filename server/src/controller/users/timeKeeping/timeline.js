
const Status = require("../../../models/status");

module.exports = (req, res) => {
  let userId = req.user.id;
  Status.findById(userId, (err, status) => {
    if( status !== undefined) {
        res.send( status.timeLine);
    }else{
        return res.status(400).send('some thing went wrong')
    }
  });
};

