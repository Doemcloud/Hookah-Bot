// utils/hookahManager.js
const fs = require('fs');
const path = require('path');
const coinManager = require('./coinManager'); // Предполагаем, что coinManager уже реализован

class HookahManager {
    constructor() {
        this.hookahRentInfo = null;
    }

    rentHookah(userId, duration = 1) {
        // Проверяем, доступен ли кальян для аренды
        if (this.isHookahRented()) {
            throw new Error('Кальян уже арендован.');
        }

        // Списываем монеты за аренду
        coinManager.deductUserCoins(userId, 2);

        // Устанавливаем информацию об аренде
        this.hookahRentInfo = {
            rentedBy: userId,
            endTime: Date.now() + duration * 60000, // Добавляем время аренды в миллисекундах
            puffsTaken: 0
        };
    }

    isHookahRented() {
        if (!this.hookahRentInfo) return false;
        // Проверяем, не истекло ли время аренды
        if (Date.now() > this.hookahRentInfo.endTime) {
            this.hookahRentInfo = null; // Освобождаем кальян
            return false;
        }
        return true;
    }

    takePuff(userId) {
        if (!this.isHookahRented() || this.hookahRentInfo.rentedBy !== userId) {
            throw new Error('Кальян не арендован этим пользователем или свободен.');
        }

        if (this.hookahRentInfo.puffsTaken >= 5) {
            throw new Error('Лимит затяжек исчерпан.');
        }

        // Учитываем затяжку
        this.hookahRentInfo.puffsTaken += 1;

        // Возвращаем true, если это была последняя затяжка
        return this.hookahRentInfo.puffsTaken === 5;
    }

    // Метод для выбора и отправки случайного изображения из папки Images будет добавлен здесь
}

module.exports = new HookahManager();
