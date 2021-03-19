const Profile = require("../../models/profile");

function profileController() {
  return {
    editprofile(req, res) {

      
      res.render("profile/editprofile");
    },
    async listofmentors(req, res) {
      
      const hi = await Profile.find();

      const param = req.query;
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");

      localStorage.setItem("name", JSON.stringify(param));

      res.render("profile/listofmentors", { hi: hi });
    },

    async mentordetails(req, res) {
      /*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/project";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("project");
  var query = { firstname: "helo" };
  dbo.collection("profiles").find(query).toArray(async function(err, result) {
    if (err) throw err;
    const hi = result;
    console.log(hi)
    db.close();
  });
});
const a = await hi;
res.render('/', { a: a })*/

      const hi = await Profile.find();

      const param = req.query;
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");

      localStorage.setItem("name", JSON.stringify(param));

      res.render("profile/mentordetails", { hi: hi });
    },
   async temp(req, res) {
      const hi = await Profile.find();

      const param = req.query;
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");

      localStorage.setItem("name", JSON.stringify(param));

      res.render("profile/temp", { hi: hi });
   
    },

    postprofile(req, res) {
      console.log(req.body);

      const {
        firstname,
        lastname,
        bintro,
        dintro,
        city,
        state,
        areaofexpertise,
        contact,
        email,
        experience,
        education
      } = req.body;

      const hello = new Profile({
        firstname,
        lastname,
        bintro,
        dintro,
        city,
        state,
        areaofexpertise,
        contact,
        email,
        experience,
        education
      });

      hello
        .save()
        .then((hello) => {
          return res.redirect("/mdashboard");
        })
        .catch((err) => {
          return res.redirect("/404");
        });
    },
  };
}

module.exports = profileController;
