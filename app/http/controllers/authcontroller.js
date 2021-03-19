const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("../../../server.js");
const cookieParser = require("cookie-parser");
const express = require("express");
const flash = require("express-flash");
let app = express();



app.use(cookieParser);

function authController() {
  return {


    login(req, res) {
      res.render("auth/login");
      
    },

    async postLogin(req, res, next) {
      const { email, password } = req.body;
      // Validate request
      if (!email || !password) {
        req.flash('error', 'All fields are required')
        return res.redirect("/login");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          console.log(err)
          req.flash('error', info.message )
          return next(err);
          console.log(err)
        }
        if (!user) {
          req.flash('error', 'invalid credentials' )
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            
            req.flash('error', info.message )
            return next(err);
            
          }

          const a = user.role;

          if (user.role == "student") {
            let hello = {
              name: "a",
              age: "5",
            };
            res.cookie("userData", hello);
            console.log(req.cookies);


              const param = user.role;
      const param2 = user.name;
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");
      const storageItem = JSON.stringify(param)
      const storageItem2 = JSON.stringify(param2)

      localStorage.setItem("ab", storageItem);
      localStorage.setItem("ac", storageItem2);


            return res.redirect("/sdashboard");
          } 
          else {

//temp
            
      const param = user.role;
      const param2 = user.name;
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");
      const storageItem = JSON.stringify(param)
      const storageItem2 = JSON.stringify(param2)

      localStorage.setItem("ab", storageItem);
      localStorage.setItem("ac", storageItem2);
            return res.redirect("/mdashboard");
          }
        });
      })(req, res, next);
    },

    register(req, res) {
      res.render("auth/register");
    },
    async postRegister(req, res) {
      const { name, city, contact, email, password, role } = req.body;
      // Validate request
      console.log(req.body);
      if (!name || !city || !contact || !role || !email || !password) {
        req.flash('error', 'All fields are required')
        return res.redirect("/register");
      }

      // Check if email exists
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash('error', 'Email already exists. Please try a different one!')
          return res.redirect("/register");
        }
      });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a user
      //create a user

      const user = new User({
        name,
        city,
        contact,
        role,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          return res.redirect("/login");
        })
        .catch((err) => {
          return res.redirect("/register");
        });
    },
  };
}

module.exports = authController;
