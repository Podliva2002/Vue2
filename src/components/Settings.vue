<template>
    <h2>Настройки</h2>
    <div>
        <p>Выбор сложности</p>
        <select v-model="gameSettings.selectedDifficulty" @change="updateSettings">
            <option v-for="difficultyLevel in gameSettings.difficulty" :key="difficultyLevel" :value="difficultyLevel">{{ difficultyLevel }}</option>
        </select>
    </div>
    
    <div>
        <p>Выбор таймера</p>
        <select :disabled="gameSettings.selectedDifficulty !== 'Пользовательский'" v-model="gameSettings.timerLeft">
            <option value="60">60 секунд</option>
            <option value="120">120 секунд</option>
            <option value="180">180 секунд</option>
        </select>
    </div>

    <div>
        <p>Выбор операций</p>
        <select :disabled="gameSettings.selectedDifficulty !== 'Пользовательский'" v-model="gameSettings.selectCalculation">
            <option v-for="difficalc in gameSettings.Calculation" :key="difficalc" :value="difficalc">{{ difficalc }}</option>
        </select>
    </div>
</template>

<script>
import { userSettings } from '../stores/gameSettings';

export default {
    setup() {
        const gameSettings = userSettings();
        const updateSettings = () => {
            gameSettings.updateSettings(gameSettings.selectedDifficulty);
        };
    
    return {
        gameSettings,
        updateSettings,
    };
    }
}
</script>


<style scoped>
select {
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    width: 100%;
    background-color: #f1f1f1;
    color: #333;
    border: none;
}

p {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
    color: #333;
    text-align: center;
}
</style>