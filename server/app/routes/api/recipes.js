'use strict';
const path = require('path');
const router = require('express').Router();
const db = require(path.join(__dirname, '../../../db'));
const Recipe = db.model('recipe');
module.exports = router;

router.get('/', function (req, res, next){
  return Recipe.findAll({
    where: req.query
  })
  .then(function (recipes) {
    res.send(recipes);
  })
  .catch(next);
});

router.param("id", function(req, res, next, id) {
    Recipe.findById(id)
    .then(function(recipe) {
        req.recipe = recipe;
        next();
    })
    .catch(next);
})

router.get('/:id', function(req, res, next) {
    res.send(req.recipe);
})