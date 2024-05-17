// utils/coinManager.js
const fs = require('fs');
const path = require('path');

const userDataPath = path.join(__dirname, '..', 'data', 'users.json');

class CoinManager {
    constructor() {
        this.loadUsersData();
    }

    loadUsersData() {
        if (!fs.existsSync(userDataPath)) {
            fs.writeFileSync(userDataPath, '{}');
        }

        const data = fs.readFileSync(userDataPath, 'utf8');
        this.usersData = JSON.parse(data);
    }

    saveUsersData() {
        fs.writeFileSync(userDataPath, JSON.stringify(this.usersData, null, 2));
    }

    getUserData(userId) {
        return this.usersData[userId] || { coins: 0, puffs: 0 };
    }

    updateUserCoins(userId, amount) {
        const user = this.getUserData(userId);
        user.coins = (user.coins || 0) + amount;
        this.usersData[userId] = user;
        this.saveUsersData();
    }

    deductUserCoins(userId, amount) {
        const user = this.getUserData(userId);
        if (user.coins < amount) {
            throw new Error('Недостаточно монет');
        }
        user.coins -= amount;
        this.usersData[userId] = user;
        this.saveUsersData();
    }
}

module.exports = new CoinManager();
