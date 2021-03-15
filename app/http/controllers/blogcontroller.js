const Blog = require("../../models/blog");
const Blog2 = require("../../models/blog2");

function blogController() {
  return {
    async index(req, res) {
      const hi = await Blog.find();
      res.render("blog/blog", { hi: hi });
    },
    createblog(req, res) {
      res.render("blog/createblog");
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
          return res.redirect("/");
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
          return res.redirect("/");
        })
        .catch((err) => {
          return res.redirect("/error");
        });
    },
    async requestedblog(req, res) {
      const hi = await Blog2.find();
      res.render("blog/requestedblog", { hi: hi });
    },
  };
}

module.exports = blogController;
