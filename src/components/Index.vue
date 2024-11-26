<script>
import { ref } from 'vue';
import Game from './Game.vue';
import Settings from './Settings.vue';
export default {
  components: {
    Game,
    Settings
  },
  setup() {
    const isSwitch = ref(false); 

    const toggleSwitch = () => {
      isSwitch.value = !isSwitch.value
    }
    
    return {
        isSwitch,
        toggleSwitch
    }
  }
};

</script>

<template>
  <h1>Устный счет</h1>
  <Game v-if="isSwitch"/>
  <Settings v-else/>
  <button @click="toggleSwitch">{{ isSwitch ? 'Настройки' : 'Игра' }}</button>
  
</template>



<style scoped>
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 45px;
  color: #333;
}
</style>
