const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects.js');
const model = require('../models/CurrencyShop');
const model2 = require('../models/UserItems');
const model3 = require('../models/Users');
const { stats } = require('../rpg.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Show items in your inventory.'),

        async execute(interaction) {
            const target = interaction.options.getUser('user') ?? interaction.user;
            const user = await Users.findOne({ where: { user_id: target.id } });
            const items = await user.getItems();

            if(!items.length || items == null) return interaction.reply(`${target.tag} has nothing!`);

            const inventoryEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle(`${target.tag}'s Inventory`)
                .setDescription(`\n${items.map(i => `${i.amount} ${i.item.name}`).join('\n ')} 
                \n ${target.tag}'s stats: \n  attack: ${stats.getAttack(target.id)} \n defense: ${stats.getDefense(target.id)} \n hp: ${stats.getHP(target.id)} \n exp: ${stats.getXP(target.id)}`);



            return interaction.reply({ embeds: [inventoryEmbed] });
        }
}