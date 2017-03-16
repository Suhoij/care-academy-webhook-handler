'use strict';

module.exports = function (sequelize, DataTypes) {
    var npsView = sequelize.define('NpsView', {
        totalCount: DataTypes.INTEGER,
        promoters: DataTypes.INTEGER,
        detractors: DataTypes.INTEGER,
        className: DataTypes.STRING,
        agency: DataTypes.STRING
    }, {
        tableName: 'nps_view',
        timestamps: false
    });

    npsView.removeAttribute('id');

    return npsView;
};
