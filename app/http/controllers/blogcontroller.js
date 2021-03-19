const Blog = require("../../models/blog");
const Blog2 = require("../../models/blog2");

function blogController() {
  return {
    async index(req, res) {
      const hi = await Blog.find();
      res.render("blog/blog", { hi: hi });
    },
    createblog(req, res) {

      var LocalStorage = require("node-localstorage").LocalStorage;
      LocalStorage = new LocalStorage("./scratch");
      const role = LocalStorage.getItem('ab');
      
      if (role == '"mentor"') {
        res.render("blog/createblog");
      }
      else{
        res.redirect("/403");
      }
    },
     

    postblog(req, res) {
      console.log(req.body);

      const { title, description, technology, addedby, time, date } = req.body;

      const blogobj = new Blog({
        title,
        description,
        technology,
        addedby,
        time,
        date
      });

      blogobj
        .save()
        .then((blogobj) => {
          return res.redirect("/blogs");
        })
        .catch((err) => {
          console.log(err)
          return res.redirect("/error");
        });
    },

    requestblog(req, res) {
      res.render("blog/requestblog");
    },

    postrequestblog(req, res) {
      console.log(req.body);

      const { title, description, technology } = req.body;

      const blogobj2 = new Blog2({
        title,
        description,
        technology,
      });

      blogobj2
        .save()
        .then((blogobj2) => {
          return res.redirect("/blogs");
        })
        .catch((err) => {
          return res.redirect("/error");
        });
    },
    async requestedblog(req, res) {



 const hi = await Blog2.find();
 var LocalStorage = require("node-localstorage").LocalStorage;
      LocalStorage = new LocalStorage("./scratch");
      const role = LocalStorage.getItem('ab');
      
      if (role == '"mentor"') {
        res.render("blog/requestedblog", { hi: hi });
      }
      else{
        res.redirect("/403");
      }
      
    },
  };
}

module.exports = blogController;
