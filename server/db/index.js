'use strict';
var db = require('./_db');
module.exports = db;

require('./models/user')(db);
require('./models/recipes')(db);

var User = db.model('user');
var Recipe = db.model('recipe');

User.hasMany(Recipe);

