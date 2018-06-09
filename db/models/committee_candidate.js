'use strict';
module.exports = (sequelize, DataTypes) => {
  var Committee_Candidate = sequelize.define('Committee_Candidate', {}, {
    timestamps: true
  });

  Committee_Candidate.associate = function(models) { };
  return Committee_Candidate;
};