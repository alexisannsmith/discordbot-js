module.exports = (sequelize, DataTypes) => {
	return sequelize.define('monsters', {
		monster_id: {
			type: DataTypes.STRING,
			defaultValue: 'monster',
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		monsterAttack: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
        monsterDefense: {
            type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
        },
        monsterHP: {
            type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
        },
		defeatXP: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		loot: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		monsterCode: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false
		}
	}, {
		timestamps: false,
	});
};