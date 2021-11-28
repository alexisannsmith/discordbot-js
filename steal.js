const { SlashCommandBuilder } = require('@discordjs/builders');
const { stats } = require('../rpg.js');
const model = require('../models/CurrencyShop');
const model2 = require('../models/UserItems');
const model3 = require('../models/Users');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('steal')
        .setDescription('Try your hand at some thievery.')
        .addUserOption(option => option.setName('user').setDescription('Who do you want to steal from?')),

        async execute(interaction) {
            let minSteal = Math.floor(0);
            let maxSteal = Math.floor(5);
            var stealAmount = Math.floor(Math.random() * (maxSteal - minSteal + 1) + minSteal);
            const stealTarget = interaction.options.getUser('user');
            const currentAmount = stats.getBalance(stealTarget.id);

            if (stealAmount > currentAmount || stealAmount == 0 ) {
                return interaction.reply(`Bad luck... try again later.`);
            }

            stats.addCurrency(interaction.user.id, stealAmount);
            stats.addCurrency(stealTarget.id, -stealAmount);

            return interaction.reply(`You stole ${stealAmount}💰 from ${stealTarget.tag}! Your current balance is ${stats.getBalance(interaction.user.id)}💰`);
        }
    }