const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Formatters } = require('discord.js')
const { stats, client } = require('../rpg.js');
const model = require('../models/CurrencyShop');
const model2 = require('../models/UserItems');
const model3 = require('../models/Users');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Check the leaderboard.'),

    async execute(interaction) {
        return interaction.reply(
	    Formatters.codeBlock(
		    stats.sort((a, b) => b.balance - a.balance)
			    .filter(user => client.users.cache.has(user.user_id))
			    .first(10)
			    .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
			    .join('\n'),
	        ),
        );
    }
}