const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());


// /////////////////////////////////////////////////////////////////////////////
// Logs all requests path and method
app.use(function (req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// /////////////////////////////////////////////////////////////////////////////
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false,
//   setHeaders: function (res, path, stat) {
//     res.set('x-timestamp', Date.now())
//   }
// }
app.use(express.static('React/dist/'))


// /////////////////////////////////////////////////////////////////////////////
// This handles GET requests to the root route '/'
app.get('*', (req, res) => {
  console.log('[express-hello-world] root handler called');
  res.sendFile(__dirname + '/React/dist/index.html');
})
app.post('/', (req, res) => {
  if (req.body["title"])
  {
    console.log(req.body["title"]);
  }
  res.status(200).json({message:"Hello world"});
});
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
