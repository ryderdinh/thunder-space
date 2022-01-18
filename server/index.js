const app = require('./src/app')
//———————————————————————————APP LISTEN—————————————————————————————//
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
