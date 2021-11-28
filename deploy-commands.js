const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9'}).setToken(token);

(async () => {
    try {
        console.log('Refreshing application (/) commands...');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        );
        console.log('Success.');
    }catch(error) {
        console.error(error);
    }
})();

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Commands registered.'))
    .catch(console.error);