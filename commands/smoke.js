// commands/smoke.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

const hookahManager = require('../utils/hookahManager');
const coinManager = require('../utils/coinManager'); // Убедитесь, что модуль coinManager подключен

module.exports = {
    data: new SlashCommandBuilder()
        .setName('smoke')
        .setDescription('Арендует кальян и позволяет сделать затяжку.'),
    async execute(interaction) {
        const userId = interaction.user.id;

        try {
            // Попытка арендовать кальян
            hookahManager.rentHookah(userId);
            // Создаем компонент кнопки для затяжки
            const smokeButton = new MessageButton()
                .setCustomId('smoke')
                .setLabel('Закурить')
                .setStyle('PRIMARY');

            const row = new MessageActionRow().addComponents(smokeButton);

            await interaction.reply({ content: 'Кальян успешно арендован. Нажмите кнопку "Закурить" для затяжки.', components: [row] });
        } catch (error) {
            // Отправляем сообщение об ошибке, если аренда невозможна
            await interaction.reply({ content: error.message, ephemeral: true });
        }
    }
};
