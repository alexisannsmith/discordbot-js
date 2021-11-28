const { SlashCommandBuilder } = require('@discordjs/builders');
const { stats} = require('../rpg.js');
const model = require('../models/CurrencyShop');
const model2 = require('../models/UserItems');
const model3 = require('../models/Users');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Get $ balance.'),

        async execute(interaction) {
            const target = interaction.options.getUser('user') ?? interaction.user;
            interaction.reply(`@${target.tag} has ${stats.getBalance(target.id)}💰`);
        }
}