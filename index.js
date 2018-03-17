// express
const express = require('express');

const app = express();

//  parse body
const bodyParser = require('body-parser');

// shell
const shell = require('shelljs');

const path = require('path');

const PASSWORD = 'YourPassword'; // change your password here

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.post('/', (req, res) => {
  const body = req.body;
  const prefix = path.join('/BaiduPCS-Go ');
  const cmd = prefix + body.cmd;
  const psw = body.psw;
  const method = body.cmd.split(' ')[0];

  if (psw !== PASSWORD) {
    res.send('invalid password');
    return;
  }

  shell.exec(cmd, (code, stdout, stderr) => {
    let result = {code};
    if (code === 0) {
      result.data = stdout;
    } else {
      result.data = stderr;
    }
    result.method = method;
    res.send(result);
  });
});

console.log('Listennint on port 3000');
app.listen(3000);
