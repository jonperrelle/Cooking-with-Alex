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
            title: "Lasagna",
            mealtype: 'Dinner',
            description: "It takes a little work, but its worth it",
            ingredients: ['1 pound sweet Italian Sausage', '3/4 pound ground beef', '2 cloves garlic, crushed', '1 can (28 ounce) of tomato sauce', '1/2 cup of water', '1 1/2 teaspoons dried basil leaves', '1 tablespoon salt', '1/4 teasponn black pepper', '12 lasagna noodles', '8 ounces ricotta cheese', '1 egg', '3/4 pound mozarella cheese'],
            directions: ['In a Dutch oven, cook sausage, ground beef, and garlic over medium heat until well browned. Stir in tomato sauce, and water. Season with basil, Italian seasoning, 1 tablespoon salt, and pepper. Simmer, covered, for about 1 1/2 hours, stirring occasionally.', 'Bring a large pot of lightly salted water to a boil. Cook lasagna noodles in boiling water for 8 to 10 minutes. Drain noodles, and rinse with cold water. In a mixing bowl, combine ricotta cheese with egg, and 1/2 teaspoon salt.', 'Preheat oven to 375 degrees F (190 degrees C).', 'To assemble, spread 1 1/2 cups of meat sauce in the bottom of a 9x13 inch baking dish. Arrange 6 noodles lengthwise over meat sauce. Spread with one half of the ricotta cheese mixture. Top with a third of mozzarella cheese slices. Spoon 1 1/2 cups meat sauce over mozzarella, and sprinkle with 1/4 cup Parmesan cheese. Repeat layers, and top with remaining mozzarella and Parmesan cheese. Cover with foil: to prevent sticking, either spray foil with cooking spray, or make sure the foil does not touch the cheese.', 'Bake in preheated oven for 25 minutes. Remove foil, and bake an additional 25 minutes. Cool for 15 minutes before serving.'],
            userId: 1
        },
        {
            title: "Dessert Bars",
            mealtype: 'Dessert',
            description: 'A simple dessert',
            ingredients: ['2 cups butter, softened', '2 cups white sugar', '4 egg yolks', '4 cups all purpose flour', '1 1/2 cups raspberry jam'],
            directions: ['Preheat oven to 350 degrees F (175 degrees C). Grease a 9 by 13 inch baking pan.', 'In a medium bowl, cream together the butter and sugar until light and fluffy. Blend in the egg yolks. Gradually mix in the flour to form a dough. With lightly floured hands, press half of the dough into the bottom of the prepared pan. Spread evenly with raspberry jam. Flatten pieces of the remaining dough and place them over the raspberry layer to cover the top.', 'Bake for 30 minutes in the preheated oven, until lightly golden. Cool slightly before cutting into bars.'],
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
