function chatController() {
  return {
    index(req, res) {
      
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");
      res.render("chat/chatdb");


      /*const storage = require('node-sessionstorage')

			storage.setItem('foo', 'bar')

			console.log('item set:', storage.getItem('foo'))*/
    },
    chat(req, res) {
      res.render("chat/chat");

      /*const storage = require('node-sessionstorage')
            console.log('item set:', storage.getItem('foo'))*/
    },
  };
}

module.exports = chatController;
