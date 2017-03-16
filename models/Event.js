'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Event', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        studentId: DataTypes.INTEGER,
        eventType: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE
    }, {
        tableName: 'event'
    });
};
