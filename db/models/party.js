'use strict';
module.exports = (sequelize, DataTypes) => {
  var Party = sequelize.define('Party', {
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {});
  Party.associate = function(models) {
    // associations can be defined here
  };
  return Party;
};