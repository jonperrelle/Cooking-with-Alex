var Sequelize = require('sequelize');


module.exports = function (db) {

    var User = db.model('user');

    db.define('recipe', {
        title: {
          type: Sequelize.STRING
        },
        mealtype: {
          type: Sequelize.ENUM('Breakfast', 'Lunch', 'Dinner', 'Dessert')
        },
        description: {
          type: Sequelize.TEXT
        },
        imageUrl: {
          type: Sequelize.STRING
        },
        sourceUrl: {
          type: Sequelize.STRING
        },
        ingredients: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: [],
            set: function (tags) {

              tags = tags || [];

              if (typeof tags === 'string') {
                tags = tags.split(',').map(function (str) {
                  return str.trim();
                });
              }

              this.setDataValue('ingredients', tags);

            }
        },
        directions: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
            set: function (tags) {

              tags = tags || [];

              if (typeof tags === 'string') {
                tags = tags.split(',').map(function (str) {
                  return str.trim();
                });
              }

              this.setDataValue('directions', tags);

            }
        }
    }, {
      defaultScope: {
        include: [User]
      }

    });



};