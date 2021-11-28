const rest = require('./deploy-commands.js');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', async () => {
    console.log('Lord Farquaad is online!')
});

client.commands = new Collection();             


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));         // Searches commands folder for .js files. Keeps commands organized in the command folder.
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}


client.on('interactionCreate', async interaction => {       // Handles slash commands
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
    }
});

client.login(token);