// commands/sprofile.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

const userDataPath = path.join(__dirname, '..', 'data', 'users.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sprofile')
        .setDescription('Отображает профиль пользователя.'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const usersData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));

        const user = usersData[userId] || { coins: 0, puffs: 0 };
        const rank = Object.keys(usersData).sort((a, b) => usersData[b].puffs - usersData[a].puffs).indexOf(userId) + 1;

        const profileEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${interaction.user.username} - Профиль`)
            .addFields(
                { name: 'Ник', value: interaction.user.username },
                { name: 'Затяжек', value: `${user.puffs}`, inline: true },
                { name: 'Монет', value: `${user.coins}`, inline: true },
                { name: 'Место в топе', value: `${rank}` },
            );

        await interaction.reply({ embeds: [profileEmbed] });
    }
};
