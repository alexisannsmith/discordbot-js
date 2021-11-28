const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users, Monsters } = require('../dbObjects.js');
const { stats } = require('../rpg.js');
const model = require('../models/CurrencyShop');
const model2 = require('../models/UserItems');
const model3 = require('../models/Users');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('monster')
        .setDescription('Fight a random monster.'),

        async execute(interaction) {
            var userAttack = await stats.getAttack(interaction.user.id);
            var userDefense = await stats.getDefense(interaction.user.id);
            var userHP = await stats.getHP(interaction.user.id);

            if(userHP == 0) {
                return interaction.reply(`You don't have any HP!`);
            }

            var minMonster = 1;
            var maxMonster = 17
            var randomMonster = Math.floor(Math.random() * (maxMonster - minMonster + 1) + minMonster);
            
            const enemy = await Monsters.findOne({ where: {monsterCode: randomMonster} });
            var enemyHP = enemy.monsterHP;

            await interaction.reply(`Encounter: ${enemy.name}\n HP: ${enemy.monsterHP}\n Attack: ${enemy.monsterAttack}\n Defense: ${enemy.monsterDefense}`);

            var count = 1;
            var userDamage = (userAttack - enemy.monsterDefense);
            var monsterDamage = (enemy.monsterAttack - userDefense);

            if(userDamage < enemy.monsterDefense) {
                userDamage = 0;
            }
            
            do {
                var totalUserDamage = (userDamage * count);
                var totalMonsterDamage = (monsterDamage * count);


                if (totalUserDamage < 0) {
                    totalUserDamage = 0;
                }


                enemyHP -= userDamage;

                
                if(enemyHP <= 0) {
                    stats.addCurrency(interaction.user.id, enemy.loot);
                    stats.addXP(interaction.user.id, enemy.defeatXP);
                    await interaction.followUp(`You defeated the ${enemy.name}! Received ${enemy.defeatXP}XP and ${enemy.loot}💰.`);
                }

                userHP -= monsterDamage;

                if(userHP <= 0) {
                    await interaction.followUp(`You lost. \n Damage dealt:\n You: ${totalUserDamage}\n Monster: ${totalMonsterDamage}\n Your current HP: 0 \n Monster's HP: ${enemy.monsterHP}.`);
                }

                count ++;

            } while(userHP > 0 && enemyHP > 0);
        }
    }