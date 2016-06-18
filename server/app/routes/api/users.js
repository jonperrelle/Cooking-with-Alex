'use strict';
const path = require('path');
const router = require('express').Router();
const db = require(path.join(__dirname, '../../../db'));
const Recipe = db.model('recipe');
const User = db.model('user');
module.exports = router;


router.param("id", function(req, res, next, id) {
    User.findById(id)
    .then(function(user) {
        req.loggedInUser = user;
        next();
    })
    .catch(next);
})

router.get('/:id/recipes', function(req, res, next) {
    Recipe.findAll({
      where: {
        userId: req.loggedInUser.id
      }
    })
    .then(function(recipes) {
      res.send(recipes);
    })
    .catch(next);
})

router.post('/:id/recipes', function(req, res, next) {
    if (req.user.id !== req.loggedInUser.id) res.sendStatus(401);
    else {
        User.findById(req.loggedInUser.id)
        .then(function(user) {
            req.body.userId = user.id
            return Recipe.create(req.body);
        })
        .then(function(data) {
            res.send(data);
        })
    }
})

router.get('/:id/recipes/:recipeId', function(req, res, next) {
    if (req.user.id !== req.loggedInUser.id) res.sendStatus(401);  
    else {
        Recipe.findById(req.params.recipeId)
        .then(function(recipe) {
            res.send(recipe);
        })
        .catch(next);
    }
})