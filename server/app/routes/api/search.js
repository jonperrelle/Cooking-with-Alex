'use strict';
const path = require('path');
const router = require('express').Router();
const db = require(path.join(__dirname, '../../../db'));
const Recipe = db.model('recipe');
const User = db.model('user');
const unirest = require('unirest');
const key = require('../../../../mashable-key').key;
module.exports = router;

router.get('/', function (req, res, next){
  let searchItem = req.query.recipe;
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + searchItem)
  .header("X-Mashape-Key", key)
  .end(function (result) {
    res.send(result.body);
  });

});

router.get('/:recipeId', function (req, res, next){
  let recipeId = req.params.recipeId;
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeId + "/information?includeNutrition=false")
  .header("X-Mashape-Key", "EcW65VlVIcmshqQloE2h4HzqHH5Jp1efgrDjsnxx2uu9dMD8gQ")
  .end(function (result) {
    let url = encodeURIComponent(result.body.sourceUrl) 
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=false&url=" + url)
    .header("X-Mashape-Key", key)
    .end(function (finalResult) {
      console.log(finalResult.body);
      res.send(finalResult.body);
    });
  });
});

