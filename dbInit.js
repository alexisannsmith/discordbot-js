const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop.js')(sequelize, Sequelize.DataTypes);
require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);

const Monsters = require('./models/Monsters.js')(sequelize, Sequelize.DataTypes);


const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Light Armor', cost: 1, defense: 2, hp: 10, attack: 0}),
		CurrencyShop.upsert({ name: 'Medium Armor', cost: 1, defense: 4, hp: 18, attack: 0 }),
		CurrencyShop.upsert({ name: 'Heavy Armor', cost: 1, defense: 5, hp: 25, attack: 0 }),
		CurrencyShop.upsert({ name: 'Shortsword', cost: 1, attack: 4, defense: 0, hp: 0 }),
		CurrencyShop.upsert({ name: 'Longsword', cost: 1, attack: 6, defense: 0, hp: 0 }),
		CurrencyShop.upsert({ name: 'Hammer', cost: 1, attack: 7, defense: 0, hp: 0 }),
		CurrencyShop.upsert({ name: 'Long Bow', cost: 1, attack: 4, defense: 2, hp: 0 }),
		CurrencyShop.upsert({ name: 'Magic Tome Earth', cost: 1, attack: 5, defense: 2, hp: 0 }),
		CurrencyShop.upsert({ name: 'Magic Tome Fire', cost: 1, attack: 5, defense: 2, hp: 0 }),
		CurrencyShop.upsert({ name: 'Magic Tome Air', cost: 1, attack: 5, defense: 2, hp: 0 }),
		CurrencyShop.upsert({ name: 'Magic Tome Health', cost: 1, attack: 0, defense: 0, hp: 15 }),
		CurrencyShop.upsert({ name: 'Potion of Healing', cost: 1, attack: 0, defense: 0, hp: 10 }),
		CurrencyShop.upsert({ name: 'Potion of Strength', cost: 1, attack: 10, defense: 0, hp: 0 }),
		CurrencyShop.upsert({ name: 'Potion of Protection', cost: 1, attack: 0, defense: 10, hp: 0 }),
	];
	const monsters = [
		Monsters.upsert({ name: 'Giant Spider', monsterAttack: 3, monsterDefense: 3, monsterHP: 20, defeatXP: 100, loot: 10, rarity: 'common', monsterCode: 1 }),
		Monsters.upsert({ name: 'Goblin', monsterAttack: 4, monsterDefense: 3, monsterHP: 20, defeatXP: 150, loot: 15, rarity: 'common', monsterCode: 2 }),
		Monsters.upsert({ name: 'Ogre', monsterAttack: 5, monsterDefense: 4, monsterHP: 25, defeatXP: 200, loot: 20, rarity: 'common', monsterCode: 3 }),
		Monsters.upsert({ name: 'Gnome', monsterAttack: 3, monsterDefense: 5, monsterHP: 20, defeatXP: 200, loot: 20, rarity: 'common', monsterCode: 4 }),
		Monsters.upsert({ name: 'Hobgoblin', monsterAttack: 3, monsterDefense: 5, monsterHP: 20, defeatXP: 200, loot: 20, rarity: 'common', monsterCode: 5 }),
		Monsters.upsert({ name: 'Minotaur', monsterAttack: 6, monsterDefense: 4, monsterHP: 30, defeatXP: 300, loot: 40, rarity: 'uncommon', monsterCode: 6 }),
		Monsters.upsert({ name: 'Giant', monsterAttack: 7, monsterDefense: 5, monsterHP: 35, defeatXP: 350, loot: 40, rarity: 'uncommon', monsterCode: 7 }),
		Monsters.upsert({ name: 'Occultist', monsterAttack: 5, monsterDefense: 6, monsterHP: 30, defeatXP: 300, loot: 40, rarity: 'uncommon', monsterCode: 8 }),
		Monsters.upsert({ name: 'Medusa', monsterAttack: 15, monsterDefense: 20, monsterHP: 100, defeatXP: 500, loot: 70, rarity: 'rare', monsterCode: 9 }),
		Monsters.upsert({ name: 'Hydra', monsterAttack: 20, monsterDefense: 12, monsterHP: 120, defeatXP: 500, loot: 75, rarity: 'rare', monsterCode: 10 }),
		Monsters.upsert({ name: 'Pirate Ghost', monsterAttack: 17, monsterDefense: 10, monsterHP: 100, defeatXP: 500, loot: 70, rarity: 'rare', monsterCode: 11 }),
		Monsters.upsert({ name: 'Vampire', monsterAttack: 19, monsterDefense: 15, monsterHP: 150, defeatXP: 600, loot: 90, rarity: 'rare', monsterCode: 12 }),
		Monsters.upsert({ name: 'Evil Wizard', monsterAttack: 14, monsterDefense: 14, monsterHP: 130, defeatXP: 600, loot: 80, rarity: 'rare', monsterCode: 13 }),
		Monsters.upsert({ name: 'Blood Dragon', monsterAttack: 50, monsterDefense: 50, monsterHP: 300, defeatXP: 1000, loot: 150, rarity: 'ultra rare', monsterCode: 14 }),
		Monsters.upsert({ name: 'Unicorn', monsterAttack: 30, monsterDefense: 60, monsterHP: 250, defeatXP: 1000, loot: 150, rarity: 'ultra rare', monsterCode: 15 }),
		Monsters.upsert({ name: 'Mummy Lord', monsterAttack: 45, monsterDefense: 45, monsterHP: 250, defeatXP: 1000, loot: 140, rarity: 'ultra rare', monsterCode: 16 }),
		Monsters.upsert({ name: 'Kraken', monsterAttack: 40, monsterDefense: 50, monsterHP: 300, defeatXP: 1000, loot: 150, rarity: 'ultra rare', monsterCode: 17 }),
	];

	await Promise.all(shop, monsters);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);
