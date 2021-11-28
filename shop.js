const { SlashCommandBuilder } = require('@discordjs/builders');
const { Formatters } = require('discord.js');
const { CurrencyShop } = require('../dbObjects.js');
const model = require('../models/CurrencyShop');
const model2 = require('../models/UserItems');
const model3 = require('../models/Users');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Browse wares.'),

        async execute(interaction) {
            const items = await CurrencyShop.findAll();
            return interaction.reply(Formatters.codeBlock(items.map(i => `${i.name}: ${i.cost}💰 defense: ${i.defense} attack: ${i.attack} hp: ${i.hp}`).join('\n')));
        }
    }