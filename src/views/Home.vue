<template>
  <div class="home">
    <h1 class="title">{{ title }}</h1>
    <div class="container-content">
      <div class="input-container">
        <input type="text" v-model="name" placeholder="Digite seu nome" />
      </div>
      <div class="select-container">
        <select class="custom-select" v-model="selectedOption">
          <option value="facil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="dificil">Difícil</option>
        </select>
        <span class="select-arrow"></span>
      </div>
    </div>
    <button
      class="start-button"
      :class="{ disabled: !isButtonEnabled }"
      @click="startGame"
      :disabled="!isButtonEnabled"
    >
      Iniciar Jogo
    </button>
  </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex';

import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",

  data() {
    return {
      name: '',
      selectedOption: 'facil'
    };
  },

  computed: {
    ...mapGetters(['getTitle']),
    title() {
      return this.getTitle;
    },
    isButtonEnabled() {
      return this.selectedOption && this.name.length > 3;
    },
  },
  methods: {

    startGame() {
      this.$store.commit('SET_SELECTED_OPTION', this.selectedOption);
        this.$store.commit('SET_NAME_PLAYER', this.name);
      this.$router.push('/game');
    }
  },
});
</script>

<style scoped>
.home {
  text-align: center;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 60px;
  background: linear-gradient(to right, #00ff00, #0000ff, #ffff00);
  padding: 80px 0;
  border-radius: 5px;
  margin: 0;
  color: white;
  width: 100%;
}

.input-container {
  margin-top: 20px;
}

input[type="text"] {
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  color: white;
  font-weight: bold;
  background-image: linear-gradient(to right, #00ff00, #0000ff, #ffff00);
}

input::placeholder {
  color: white;
  font-weight: bold;
}
.select-container {
  display: inline-block;
  position: relative;
  margin-top: 20px;
}

.custom-select {
  appearance: none;
  padding: 10px 30px 10px 10px;
  width: 220px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  background-image: linear-gradient(to right, #00ff00, #0000ff, #ffff00);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
}

.select-container .select-arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: #fff transparent transparent transparent;
  pointer-events: none;
}

option {
  color: black;
  font-weight: bold;
}

.start-button {
  margin-top: 100px;
  padding: 30px 50px;
  background: linear-gradient(to right, #00ff00, #0000ff, #ffff00);
  color: #fff;
  font-size: 50px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: max-content;
}

.start-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.start-button:hover {
  background-color: #0392db;
}

.start-button:active {
  background-color: #0278b7;
}
</style>
