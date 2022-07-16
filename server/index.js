const { server } = require('./src/app');
//———————————————————————————APP LISTEN—————————————————————————————//
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
