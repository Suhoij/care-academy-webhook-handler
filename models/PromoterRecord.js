'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PromoterRecord', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        score: DataTypes.INTEGER,
        eventId: DataTypes.STRING,
        comment: DataTypes.STRING,
        agency: DataTypes.STRING,
        className: DataTypes.STRING,
        isDetractor: DataTypes.BOOLEAN,
        isPromoter: DataTypes.BOOLEAN,
        submittedAt: DataTypes.DATE
    }, {
        tableName: 'promoter_record'
    });
};