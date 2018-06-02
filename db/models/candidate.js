'use strict';
module.exports = (sequelize, DataTypes) => {
  var Candidate = sequelize.define('Candidate', {
    fullName: DataTypes.STRING,
    district: DataTypes.INTEGER,
    candidateId: DataTypes.STRING
  }, {});
  Candidate.associate = function(models) {
    Candidate.hasMany(models.Committee_Candidate)
  };
  return Candidate;
};