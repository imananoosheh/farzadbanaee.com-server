const express = require("express");
// const mongoose = require("mongoose")
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const passport = require("passport")
// const passportLocal = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
// const session = require("express-session");
const app = express();
// const Admin = require("./admin")
require('dotenv').config()
const jwt = require('jsonwebtoken');
app.use(express.json());

// connecting to MongoDB
// TODO: credentials need to be processed from dotenv file
// mongoose.connect(
//   "mongodb+srv://dbAdminArtpholio:6yN1efYWZcIX07C@cluster0.oma4u.mongodb.net/dbAdminArtpholio?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => {
//     console.log("Mongoose is Connected!");
//   }
// );

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(
//   session({
//     secret: "secretcode",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(cookieParser("secretcode"));
// app.use(passport.initialize());
// app.use(passport.session());
// require("./passportConf")(passport);


// // Routes
// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No Admin Exists");
//     else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(req.user);
//       });
//     }
//   })(req, res, next);
// });
// app.post("/register", (req, res) => {
//   Admin.findOne({ username: req.body.username }, async (err, doc) => {
//     if (err) throw err;
//     if (doc) res.send("Admin Already Exists");
//     if (!doc) {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);

//       const newAdmin = new Admin({
//         username: req.body.username,
//         password: hashedPassword,
//       });
//       await newAdmin.save();
//       res.send("Admin Created");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });
// });
// app.get("/admin", (req, res) => {
//   res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
// });






// app.use(cookieParser("#kjan873kjb3$kjn@lkn>asdjn<^908hb3"));

// const auth = basicAuth({
//   users: {
//     admin: "123",
//     user: "456",
//   },
// });




///////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.json(data);
});

// app.get("/", authenticateToken,  (req, res) => {
//   res.json(data.filter(dat => dat.type == 'text'));
// });


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)


  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  })
}


var data = [{
  type: "text",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices dignissim lacus eu vestibulum. Aliquam ornare leo vitae nunc gravida, et lacinia velit convallis. Suspendisse condimentum, sem vitae ultrices semper, justo lectus suscipit libero, vitae accumsan arcu enim vulputate nibh. Donec luctus sapien sed pharetra tempus. Nam mollis vestibulum molestie. Praesent eu tempus nulla. Donec suscipit finibus metus id placerat. In ultricies mattis sapien eget mollis. Maecenas tincidunt est velit, vel placerat libero fermentum in.",
},
{
  type: "img",
  url: "https://direct.rhapsody.com/imageserver/images/alb.463594958/500x500.jpg",
  desc: "This is the Decription of this Artwork",
},
{
  type: "img",
  url: "https://www.designformusic.com/wp-content/uploads/2016/09/electro-synthwave-album-cover-500x500.jpg",
  desc: "This is the Decription of this Artwork",
},
{
  type: "text",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices dignissim lacus eu vestibulum. Aliquam ornare leo vitae nunc gravida, et lacinia velit convallis. Suspendisse condimentum, sem vitae ultrices semper, justo lectus suscipit libero, vitae accumsan arcu enim vulputate nibh. Donec luctus sapien sed pharetra tempus. Nam mollis vestibulum molestie. Praesent eu tempus nulla. Donec suscipit finibus metus id placerat. In ultricies mattis sapien eget mollis. Maecenas tincidunt est velit, vel placerat libero fermentum in.",
},
{
  type: "img",
  url: "https://direct.rhapsody.com/imageserver/images/alb.463594958/500x500.jpg",
  desc: "This is the Decription of this Artwork",
},
{
  type: "img",
  url: "https://direct.rhapsody.com/imageserver/images/alb.463594958/500x500.jpg",
  desc: "This is the Decription of this Artwork",
},
{
  type: "img",
  url: "https://www.designformusic.com/wp-content/uploads/2016/09/electro-synthwave-album-cover-500x500.jpg",
  desc: "This is the Decription of this Artwork",
},
{
  type: "text",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices dignissim lacus eu vestibulum. Aliquam ornare leo vitae nunc gravida, et lacinia velit convallis. Suspendisse condimentum, sem vitae ultrices semper, justo lectus suscipit libero, vitae accumsan arcu enim vulputate nibh. Donec luctus sapien sed pharetra tempus. Nam mollis vestibulum molestie. Praesent eu tempus nulla. Donec suscipit finibus metus id placerat. In ultricies mattis sapien eget mollis. Maecenas tincidunt est velit, vel placerat libero fermentum in.",
},
{
  type: "img",
  url: "https://direct.rhapsody.com/imageserver/images/alb.463594958/500x500.jpg",
  desc: "This is the Decription of this Artwork",
},
{
  type: "img",
  url: "https://direct.rhapsody.com/imageserver/images/alb.463594958/500x500.jpg",
  desc: "This is the Decription of this Artwork",
},
{
  type: "img",
  url: "https://www.designformusic.com/wp-content/uploads/2016/09/electro-synthwave-album-cover-500x500.jpg",
  desc: "This is the Decription of this Artwork",
},
{
  type: "text",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices dignissim lacus eu vestibulum. Aliquam ornare leo vitae nunc gravida, et lacinia velit convallis. Suspendisse condimentum, sem vitae ultrices semper, justo lectus suscipit libero, vitae accumsan arcu enim vulputate nibh. Donec luctus sapien sed pharetra tempus. Nam mollis vestibulum molestie. Praesent eu tempus nulla. Donec suscipit finibus metus id placerat. In ultricies mattis sapien eget mollis. Maecenas tincidunt est velit, vel placerat libero fermentum in.",
},
{
  type: "img",
  url: "https://direct.rhapsody.com/imageserver/images/alb.463594958/500x500.jpg",
  desc: "This is the Decription of this Artwork",
},
];

// const authCredentials = { username: "admin", password: "admin" };


// app.get("/authenticate", auth, (req, res) => {
//   const options = {
//     httpOnly: true,
//     signed: true,
//     maxAge: 90000,
//   };
//   console.log("Authentication request", req.auth);
//   if (req.auth.user === "admin") {
//     res.cookie("name", "admin", options).send({ screen: "admin" });
//   } else if (req.auth.user === "user") {
//     res.cookie("name", "user", options).send({ screen: "user" });
//   }
// });

// app.get("/read-cookie", (req, res) => {
//   console.log(req.signedCookies);
//   if (req.signedCookies.name === "admin") {
//     res.send({ screen: "admin" });
//   } else if (req.signedCookies.name === "user") {
//     res.send({ screen: "user" });
//   } else {
//     res.send({ screen: "auth" });
//   }
// });

// app.get("/clear-cookie", (req, res) => {
//   res.clearCookie("name").end();
// });

const port = 3001;
app.listen(port, () => console.log(`Server start on port ${port}`));