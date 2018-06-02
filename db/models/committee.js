'use strict';

module.exports = (sequelize, DataTypes) => {
  var Committee = sequelize.define('Committee', {
    name: DataTypes.STRING,
    committeeId: DataTypes.STRING,
    designationFull: DataTypes.STRING,
    state: DataTypes.STRING,
    typeCode: DataTypes.STRING,
    disignation: DataTypes.STRING,
    typeFull: DataTypes.STRING,
    firstFileDate: DataTypes.DATEONLY,
    cycles: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  Committee.associate = function(models) {
    Committee.belongsTo(models.Party);
    Committee.hasMany(models.Committee_Candidate)
  };
  return Committee;
};