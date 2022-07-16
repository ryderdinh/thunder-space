const { server } = require('./src/app');
const io = require("./src/io")
//———————————————————————————APP LISTEN—————————————————————————————//
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
