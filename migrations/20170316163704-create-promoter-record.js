'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('promoter_record', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      agency: {
        type: Sequelize.STRING
      },
      className: {
        type: Sequelize.STRING
      },
      isDetractor: {
        type: Sequelize.BOOLEAN
      },
      isPromoter: {
        type: Sequelize.BOOLEAN
      },
      submittedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('promoter_record');
  }
};