const { Client, Collection, Intents } = require('discord.js');
const { Users, UserItems, CurrencyShop, Monsters } = require('./dbObjects.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const stats = new Collection();

Reflect.defineProperty(stats, 'addCurrency', {
	value: async function addCurrency(id, amount) {
		const user = stats.get(id);

		if (user) {
			user.balance += Number(amount);
			return user.save();
		}

		const newUser = await Users.create({ user_id: id, balance: amount });
		stats.set(id, newUser);

		return newUser;
	},
});

Reflect.defineProperty(stats, 'getBalance', {
	value: function getBalance(id) {
		const user = stats.get(id);
		return user ? user.balance : 0;
	},
});

Reflect.defineProperty(stats, 'addHP', {
    value: async function addHP(id, amount) {
        const user = stats.get(id);

        if (user) {
			user.hpStat += Number(amount);
			return user.save();
		}

		const newUser = await Users.create({ user_id: id, hpStat: amount });
		stats.set(id, newUser);

		return newUser;
    },
});

Reflect.defineProperty(stats, 'getHP', {
    value: function getHP(id) {
        const user = stats.get(id);
        return user ? user.hpStat : 0;
    },
});

Reflect.defineProperty(stats, 'addAttack', {
    value: async function addAttack(id, amount) {
        const user = stats.get(id);
        
        if (user) {
			user.attackStat += Number(amount);
			return user.save();
		}

		const newUser = await Users.create({ user_id: id, attackStat: amount });
		stats.set(id, newUser);

		return newUser;
    },
});

Reflect.defineProperty(stats, 'getAttack', {
    value: function getAttack(id) {
        const user = stats.get(id);
        return user ? user.attackStat : 0;
    },

});

Reflect.defineProperty(stats, 'addDefense', {
    value: async function addDefense(id, amount) {
        const user = stats.get(id);
        if (user) {
			user.defenseStat += Number(amount);
			return user.save();
		}

		const newUser = await Users.create({ user_id: id, defenseStat: amount });
		stats.set(id, newUser);

		return newUser;
    },
});

Reflect.defineProperty(stats, 'getDefense',  {
    value: function getBalance(id) {
        const user = stats.get(id);
        return user ? user.defenseStat: 0;
    },
});

Reflect.defineProperty(stats, 'addXP', {
	value: async function addXP(id, amount) {
		const user = stats.get(id);

		if(user) {
			user.xpStat += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, xpStat: amount });
		stats.set(id, newUser);

		return newUser;
	}
});

Reflect.defineProperty(stats, 'getXP', {
	value: function getXP(id) {
		const user = stats.get(id);
		return user ? user.xpStat : 0;
	}
});



client.once('ready', async () => {
	const storedStats = await Users.findAll();
    storedStats.forEach(s => stats.set(s.user_id, s));
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
	if (message.author.bot) {
        return;
    }
	stats.addCurrency(message.author.id, 1);
});

client.on('voiceStateUpdate', (oldState, newState) => {
	if(newState.member.bot) {
		return;
	}
	stats.addCurrency(newState.member.id, 5);
});

module.exports = { client, stats };

client.login(token);