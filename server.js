require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const http = require("http");
const session = require("express-session");
const MongoDbStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const serveIndex = require('serve-index')
var cookieParser = require('cookie-parser')
upload = require("express-fileupload");
app.use(flash());

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

// Database connection
const url = "mongodb://localhost/project";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Express body parser

app.use(express.urlencoded({ extended: true }));

// Session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

// Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hour
  })
);

//passport config
const passportInit = require("./app/config/passport");
passportInit(passport);

//upload course

app.use(upload({ createParentPath: true }))
console.log("server started")
app.get("/addcourse",function(req,res){
   var LocalStorage = require("node-localstorage").LocalStorage;
      LocalStorage = new LocalStorage("./scratch");
      const role = LocalStorage.getItem('ab');
      
      if (role == '"mentor"') {
        res.sendFile(__dirname+"/addcourse.html")
      }
      else{
        res.redirect("/403");
      }
    

})      
app.post("/",function(req,res){
    if(req.files){
        var file = req.files.filename,
        filename = file.name;
        file.mv("./upload/"+filename,function(err){
            if(err){
                console.log(err)
                res.send("error occured")
            }
            else{
                res.redirect('/courses')
            }
        })
    }
})

//view course
app.use(
  '/courses',
  express.static('upload/'),
  serveIndex('upload/', { icons: true })
)

//passport config
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(flash())

//

// set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

//port no
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//community chat
const io = socketio(server);
const botName = "ChatCord Bot";

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});
