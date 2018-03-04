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

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

app.post('/', (req, res) => {
  const body = req.body;
  const prefix = './BaiduPCS-Go ';
  const cmd = prefix + body.cmd;
  const psw = body.psw;

  if (psw !== PASSWORD) {
    res.send('invalid password');
    return;
  }

  shell.exec(cmd, (code, stdout, stderr) => {
    let result;
    if (code === 0) {
      result = stdout;
    } else {
      result = stderr;
    }
    res.send(result);
  });
});

console.log('Listennint on port 3000');
app.listen(3000);
