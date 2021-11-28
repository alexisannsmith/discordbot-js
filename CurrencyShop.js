module.exports = (sequelize, DataTypes) => {
	return sequelize.define('currency_shop', {
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		cost: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0.
        },
	}, {
		timestamps: false,
	});
};