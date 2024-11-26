import { defineStore } from "pinia";

export const userSettings = defineStore('settings', {
    state: () => ({
        timerLeft: 180,
        selectedDifficulty: 'Легкий',
        difficulty: [
            'Легкий',
            'Средний',
            'Сложный',
            'Пользовательский'
        ],
        selectCalculation: 'Сложение/Вычитание',
        Calculation: [
            'Сложение/Вычитание',
            'Умножение/Деление',
            'Микс'
        ],
    }),
    actions: {
        updateSettings(newDiff) {
            this.selectedDifficulty = newDiff;

            if (newDiff === 'Легкий') {
                this.timerLeft = 180;
                this.selectCalculation = 'Сложение/Вычитание';
            } else if (newDiff === 'Средний') {
                this.timerLeft = 120;
                this.selectCalculation = 'Умножение/Деление';
            } else if (newDiff === 'Сложный') {
                this.timerLeft = 60;
                this.selectCalculation = 'Микс';
            }
        },
    },
});