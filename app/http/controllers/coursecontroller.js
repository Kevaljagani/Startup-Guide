const express = require('express')
const serveIndex = require('serve-index')

function courseController() {
  return {
    index(req, res) {
      serveIndex('chat', { icons: true })
      console.log(req.body)
    },

    addcourse(req, res) {
      res.render("course/addcourse");
    },
  };
}

module.exports = courseController;
