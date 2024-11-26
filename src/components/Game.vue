<template>
    <h2>Игровое поле</h2>
    <div>
        <p>Осталось времени: {{ timerLeft }} секунд</p>
        <p v-if="currentQuestion">{{ currentQuestion.question }}</p>
        <div>
            <input v-if="currentQuestion" v-model="userAnswer" type="number" placeholder="Ваш ответ" />
        </div>
        
        <button v-if="currentQuestion" @click="checkAnswer">Проверить ответ</button>
        <button @click="startGame">Начать игру</button>
    </div>
</template>

<script>
import { userSettings } from '../stores/gameSettings';
import { ref, onMounted, onUnmounted } from 'vue';

export default {
    setup() {
        const gameSettings = userSettings();
        const timerLeft = ref(gameSettings.timerLeft);
        const currentQuestion = ref(null);
        const userAnswer = ref('');
        let timer; 

        const startGame = () => {
            clearInterval(timer);
            timerLeft.value = gameSettings.timerLeft;
            userAnswer.value = '';
            generateQuestion();
            startTimer();
        };

        const startTimer = () => {
            timer = setInterval(() => {
                if (timerLeft.value > 0) {
                    timerLeft.value--;
                } else {
                    clearInterval(timer);
                    alert("Время вышло!");
                    currentQuestion.value = null;
                }
            }, 1000);
        };

        const generateQuestion = () => {
            let question;
            const difficulty = gameSettings.selectedDifficulty;
            const calc = gameSettings.selectCalculation

            if (difficulty === 'Легкий') {
                question = generateSimpleQuestion();
            } else if (difficulty === 'Средний') {
                question = generateMediumQuestion();
            } else if (difficulty === 'Сложный') {
                question = generateHardQuestion();
            } else if (difficulty === 'Пользовательский') {
                if (calc == 'Сложение/Вычитание') {
                    question = generateSimpleQuestion();
                }
                else if (calc == 'Умножение/Деление') {
                    question = generateMediumQuestion();
                }
                else if (calc == 'Микс') {
                    question = generateHardQuestion();
                }
            }


            currentQuestion.value = question;
        };

        const generateSimpleQuestion = () => {
            const num1 = Math.floor(Math.random() * 10);
            const num2 = Math.floor(Math.random() * 10);
            const operation = Math.random() < 0.5 ? '+' : '-';
            const question = `${num1} ${operation} ${num2}`;
            const answer = eval(question);
            return { question, answer };
        };

        const generateMediumQuestion = () => {
            const num1 = Math.floor(Math.random() * 10);
            const num2 = Math.floor(Math.random() * 10);
            const operation = Math.random() < 0.5 ? '*' : '/';
            const question = `${num1} ${operation} ${num2}`;
            const answer = eval(question);
            return { question, answer };
        };

        const generateHardQuestion = () => {
            const num1 = Math.floor(Math.random() * 50);
            const num2 = Math.floor(Math.random() * 50);
            const operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
            const question = `${num1} ${operation} ${num2}`;
            const answer = eval(question);
            return { question, answer };
        };

        const checkAnswer = () => {
            if (parseFloat(userAnswer.value) === currentQuestion.value.answer) {
                alert("Правильно!");
                generateQuestion();
                userAnswer.value = '';
            } else {
                alert("Неправильно, попробуйте еще раз.");
            }
        };

        onMounted(() => {
            timerLeft.value = gameSettings.timerLeft;
        });

        onUnmounted(() => {
            clearInterval(timer);
        });

        return {
            timerLeft,
            currentQuestion,
            userAnswer,
            startGame,
            checkAnswer,
        };
    }
}

</script>

<style scoped>

</style>
