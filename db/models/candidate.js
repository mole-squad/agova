'use strict';
module.exports = (sequelize, DataTypes) => {
  var Candidate = sequelize.define('Candidate', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    fullName: DataTypes.STRING,
    district: DataTypes.INTEGER,
    candidateId: DataTypes.STRING
  }, {
    timestamps: true
  });

  Candidate.associate = function(models) {
    Candidate.belongsTo(models.Party, {
      foreignKey: {
        name: 'partyId'
      }
    });

    Candidate.belongsToMany(models.Committee, { 
      through: 'Committee_Candidate',
      foreignKey: {
        name: 'candidateId',
        allowNull: false
      },
    });    
  };
  return Candidate;
};