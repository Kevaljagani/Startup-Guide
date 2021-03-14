const Event = require("../../models/event");

function eventController() {
  return {
    async index(req, res) {
      const hi = await Event.find();
      res.render("event/event", { hi: hi });
    },
    createevent(req, res) {
      res.render("event/createevent");
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
