function paymentController() {

  return {

    index(req, res) {
      const param = req.query;
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");

      localStorage.setItem("pname", JSON.stringify(param));

      res.render("payment/payment");
    },

     callback (req, res) {

      res.redirect("/");
    }
  }
}

module.exports = paymentController;
