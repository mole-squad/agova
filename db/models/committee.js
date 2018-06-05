'use strict';

module.exports = (sequelize, DataTypes) => {
  var Committee = sequelize.define('Committee', {
    name: DataTypes.STRING,
    committeeId: DataTypes.STRING,
    designationFull: DataTypes.STRING,
    state: DataTypes.STRING,
    typeCode: DataTypes.STRING,
    designation: DataTypes.STRING,
    typeFull: DataTypes.STRING,
    firstFileDate: DataTypes.DATEONLY,
    cycles: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    timestamps: true
  });

  Committee.associate = function(models) {
    Committee.belongsTo(models.Party, {
      foreignKey: {
        name: 'partyId'
      }
    });

    Committee.belongsToMany(models.Candidate, { 
      through: 'Committee_Candidate',
      foreignKey: {
        name: 'committeeId',
        allowNull: false
      },
    });
  };

  return Committee;
};