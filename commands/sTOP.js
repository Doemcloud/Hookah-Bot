// commands/sTOP.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

const userDataPath = path.join(__dirname, '..', 'data', 'users.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Отображает топ кальянщиков по количеству затяжек.'),
    async execute(interaction) {
        const usersData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));

        // Сортируем пользователей по количеству затяжек и берем топ-10
        const topUsers = Object.keys(usersData)
            .sort((a, b) => usersData[b].puffs - usersData[a].puffs)
            .slice(0, 10);

        const topEmbed = new MessageEmbed()
            .setColor('#ff4500')
            .setTitle('ТОП Кальянщиков')
            .setDescription(topUsers.map((userId, index) => {
                const user = usersData[userId];
                return `${index + 1}. ${user.username} - ${user.puffs} затяжек`;
            }).join('\n'));

        await interaction.reply({ embeds: [topEmbed] });
    }
};
