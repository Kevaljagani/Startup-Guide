const Message = require("../../models/message");

function messageController() {
  return {
    index(req, res) {
      res.render("message/leaveamessage");
    },
    async sentmessages(req, res) {
      const hi = await Message.find();
      res.render("message/sentmessages", { hi: hi });
    },
    postmessage(req, res) {
      console.log(req.body);

      const { name, message } = req.body;

      const hello = new Message({
        name,
        message,
      });

      hello
        .save()
        .then((hello) => {
          return res.redirect("/sdashboard");
        })
        .catch((err) => {
          return res.redirect("/leaveamessage");
        });
    },

    async inbox(req, res) {

      const hi = await Message.find();
var LocalStorage = require("node-localstorage").LocalStorage;
      LocalStorage = new LocalStorage("./scratch");
      const role = LocalStorage.getItem('ab');
      
      if (role == '"mentor"') {
         res.render("message/inbox", { hi: hi });
      }
      else{
        res.redirect("/403");
      }
     
    },

    chatwithmentor(req, res) {
      res.render("message/chatwithmentor");
    },
  };
}

module.exports = messageController;
