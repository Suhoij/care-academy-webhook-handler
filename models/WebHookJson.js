'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('WebHookJson', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        origin: DataTypes.INTEGER,
        data: DataTypes.JSONB,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE
    }, {
        tableName: 'web_hook_json',
        classMethods: {
            Origins: {
                MAIL_CHIMP: 1,
                TYPE_FORM: 2,
                THOUGHT_INDUSTRIES: 3
            }
        }
    });
};
