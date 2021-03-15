const Profile = require("../../models/profile");

function homeController() {
  return {
    index(req, res) {
      res.render("../../home_page/index");
    },
    async sdashboard(req, res) {

const hi = await Profile.find();

      const param = req.query;
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");

      localStorage.setItem("name", JSON.stringify(param));

      res.render("sdashboard", { hi: hi });

    },
    async mdashboard(req, res) {

     const hi = await Profile.find();

      const param = req.query;
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");

      localStorage.setItem("name", JSON.stringify(param));

      res.render("mdashboard", { hi: hi });

    },
    error(req, res) {
      res.render("error");
    },
  };
}

module.exports = homeController;
