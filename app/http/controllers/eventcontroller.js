const Event = require("../../models/event");

function eventController() {
  return {
    async index(req, res) {
      const hi = await Event.find();
      res.render("event/event", { hi: hi });
    },
    createevent(req, res) {

      var LocalStorage = require("node-localstorage").LocalStorage;
      LocalStorage = new LocalStorage("./scratch");
      const role = LocalStorage.getItem('ab');
      
      if (role == '"mentor"') {
        res.render("event/createevent");
      }
      else{
        res.redirect("/403");
      }
    },

    postevent(req, res) {
      console.log(req.body);

      const { title, description, location, time, price, date } = req.body;

      const hello = new Event({
        title,
        description,
        location,
        time,
        price,
        date
      });

      hello
        .save()
        .then((hello) => {
          return res.redirect("/event");
        })
        .catch((err) => {
          return res.redirect("/error");
        });
    },
  };
}
module.exports = eventController;
