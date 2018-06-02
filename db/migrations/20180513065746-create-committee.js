'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Committees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      committeeId: {
        type: Sequelize.STRING
      },
      designationFull: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      typeCode: {
        type: Sequelize.STRING
      },
      disignation: {
        type: Sequelize.STRING
      },
      typeFull: {
        type: Sequelize.STRING
      },
      firstFileDate: {
        type: Sequelize.DATEONLY
      },
      cycles: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Committees');
  }
};