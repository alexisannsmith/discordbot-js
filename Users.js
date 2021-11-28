module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
        hpStat: {
            type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
        },
        defenseStat: {
            type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
        },
        attackStat: { 
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
		xpStat: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};