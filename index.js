const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');
const hookahManager = require('./utils/hookahManager');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
        }
    } else if (interaction.isButton()) {
        // Здесь добавляем обработку нажатий кнопок
        if (interaction.customId.startsWith('smoke')) {
            // Обработка логики кнопки "Закурить", предполагая, что у вас уже есть такая логика
            try {
                // Сюда вставляется ваша логика обработки нажатия кнопки
                console.log('Обработка нажатия кнопки "Закурить"');
                // Например, вызов функции hookahManager.takePuff с userId
                await interaction.reply('Вы сделали затяжку.');
            } catch (error) {
                await interaction.reply({ content: error.message, ephemeral: true });
            }
        }
    }
});

client.login(token);
