/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Recipe = db.model('recipe');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            firstName: 'Jon',
            lastName: 'Smith',
            email: 'jon@jon.com',
            password: 'jon',
            twitter_id: "123",
            facebook_id: "123",
            google_id: "123",
        },
        {
            firstName: 'Jim',
            lastName: 'Jones',
            email: 'jim@jim.com',
            password: 'jim',
            isAdmin: 'true',
            twitter_id: "123",
            facebook_id: "123",
            google_id: "123",
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedRecipes = function () {

    var recipes = [
        {
            title: "Spaghetti and Meatballs",
            mealtype: 'Dinner',
            description: "Great for dinner",
            ingredients: ['1 cup tomatoes', '10 ounces water', '1 clove garlic'],
            directions: ['Step 1', 'Step 2', 'Step 3'],
            userId: 1
        },
        {
            title: "Mushroom Soup",
            mealtype: 'Lunch',
            description: 'Good lunch selection',
            ingredients: ['1 cup mushrooms', '10 ounces beer', '1 teaspoon oregano'],
            directions: ['Step 4', 'Step 5', 'Step 6'],
            userId: 2
        }
    ];

    var creatingRecipes = recipes.map(function (recipeObj) {
        console.log(recipeObj)
        return Recipe.create(recipeObj);
    });

    return Promise.all(creatingRecipes);

};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        return seedRecipes();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
