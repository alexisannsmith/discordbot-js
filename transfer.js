const { SlashCommandBuilder } = require('@discordjs/builders');
const { stats } = require('../rpg.js');
const model = require('../models/CurrencyShop');
const model2 = require('../models/UserItems');
const model3 = require('../models/Users');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('transfer')
        .setDescription('Transfer money to someone.')
        .addIntegerOption(option => option.setName('amount').setDescription('Enter the amount you want to transfer.'))
        .addUserOption(option => option.setName('user').setDescription('Enter the user you want to transfer to.')),

        async execute(interaction) {
            const currentAmount = stats.getBalance(interaction.user.id);
            const transferAmount = interaction.options.getInteger('amount');
            const transferTarget = interaction.options.getUser('user');

            if (transferAmount > currentAmount) {
                return interaction.reply(`Sorry ${interaction.user}, you only have ${currentAmount}.`);
            }

            if (transferAmount <= 0) {
                return interaction.reply(`Please enter an amount greater than zero, ${interaction.user}.`);
            }

            stats.addCurrency(interaction.user.id, -transferAmount);
            stats.addCurrency(transferTarget.id, transferAmount);

            return interaction.reply(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${stats.getBalance(interaction.user.id)}💰`);
        }
    }