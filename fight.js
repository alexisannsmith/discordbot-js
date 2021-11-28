const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users } = require('../dbObjects.js');
const { stats } = require('../rpg.js');
const model = require('../models/CurrencyShop');
const model2 = require('../models/UserItems');
const model3 = require('../models/Users');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('fight')
        .setDescription('Fight someone!')
        .addUserOption(option => option.setName('opponent').setDescription('Choose your challenger.')),

        async execute(interaction) {
            const target = interaction.options.getUser('user') ?? interaction.user;
            var userAttack = await stats.getAttack(interaction.user.id);
            var userDefense = await stats.getDefense(interaction.user.id);
            var userHP = await stats.getHP(interaction.user.id);


            const fightTarget = interaction.options.getUser('opponent');;
            var opponentAttack = await stats.getAttack(fightTarget.id);
            var opponentDefense = await stats.getDefense(fightTarget.id);
            var opponentHP = await stats.getHP(fightTarget.HP);


            if(userAttack === 0) {
                return interaction.reply('You need to have at least one weapon to fight.');
            }

            if(opponentHP ===  0) {
                return interaction.reply(`${target.tag} wins!`);
            }
            


            while(userHP > 0 && opponentHP > 0) {
                opponentHP -= (userAttack - opponentDefense);
                
                if(opponentHP <= 0) {
                    return interaction.reply(`${target.tag} wins!`);
                }

                userHP -= (opponentAttack - userDefense);

                if(userHP <= 0) {
                    return interaction.reply(`${fightTarget.tag} wins!`);
                }
            }
        }
    }