//Library imports
require('dotenv').config()
const express = require("express");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { type } = require('os');

//App instance and conf
const app = express();
app.use(express.json());

//Middleware 

//FIXME: needs to get integrated into a database
let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })

})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  //Authenticate user (admin)
  const username = req.body.username
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

app.post('/register', (req, res) => {
  //Registering new user
  const username = req.body.username
  const password = req.body.password

  const hashedCredentials = jwt.sign(username + password, process.env.HASHED_SECRET_CODE)

  fs.open('hashed.dll', 'a+', (err, fd) => {
    if (err) {
      throw err;
    }

    try {
      fs.writeFile('hashed.dll', hashedCredentials, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
        //TODO: to be deleted
        console.log('hashed file stored successfully!')
        res.json({ message: `User (${username}), is successfully registered!` })
      })
    } finally {
      fs.close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
})

app.post('/verify', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const hashedCredentials = jwt.sign(username + password, process.env.HASHED_SECRET_CODE)

  fs.readFile('hashed.dll', (err, data) => {
    if (err) throw err;
    const saveHash = data.toString()
    console.log(saveHash)
    if (hashedCredentials == saveHash) {
      res.json({ message: `Welcome, ${username}`, status: 200 })
    }

  });
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}

const port = 3002;
app.listen(port, () => console.log(`Authentication Server started on port ${port}`));