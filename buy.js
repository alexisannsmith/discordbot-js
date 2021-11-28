const { SlashCommandBuilder } = require('@discordjs/builders');
const { Op } = require('sequelize');
const { Users, CurrencyShop, UserItems } = require('../dbObjects.js');
const { stats } = require('../rpg.js');
const model = require('../models/CurrencyShop');
const model2 = require('../models/UserItems');
const model3 = require('../models/Users');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Purchase items.')
        .addStringOption(option => option.setName('item').setDescription('Which item would you like to purchase?')),

        async execute(interaction) {
            const itemName = interaction.options.getString('item');
            const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });

            if (!item) {
                return interaction.reply(`That item doesn't exist.`);
            }

            if (item.cost > stats.getBalance(interaction.user.id)) {
	            return interaction.reply(`You currently have ${stats.getBalance(interaction.user.id)}💰, but the ${item.name} costs ${item.cost}💰!`);
            }

            const user = await Users.findOne({ where: { user_id: interaction.user.id } });
            stats.addCurrency(interaction.user.id, -item.cost);
            stats.addAttack(interaction.user.id, item.attack);
            stats.addDefense(interaction.user.id, item.defense);
            stats.addHP(interaction.user.id, item.hp);
            await user.addItem(item);

            return interaction.reply(`You've bought: ${item.name}.`);
        }
    }