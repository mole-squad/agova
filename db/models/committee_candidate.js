'use strict';
module.exports = (sequelize, DataTypes) => {
  var Committee_Candidate = sequelize.define('Committee_Candidate', {}, {});
  Committee_Candidate.associate = function(models) {
    Committee_Candidate.belongsTo(models.Committee);
    Committee_Candidate.belongsTo(models.Candidate);
  };
  return Committee_Candidate;
};