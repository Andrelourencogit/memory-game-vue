<template>
  <div class="home">
    <h1 class="title">{{ titleGame }}</h1>
    <div class="info-container">
      <div class="info-text">
        <p>
          O objetivo do jogo é encontrar os pares de cartas idênticas,
          representando os escudos dos times de futebol brasileiros. As cartas
          são dispostas viradas para baixo e o jogador precisa virar duas cartas
          por vez, tentando encontrar as combinações corretas. Caso as duas
          cartas viradas sejam iguais você marca pontos. Caso contrário, as
          cartas são viradas novamente e o jogador deve tentar lembrar a posição
          delas para as próximas jogadas. Para deixar o jogo mais desafiador,
          você pode escolher o nível de dificuldade entre Fácil, Médio e
          Difícil. Cada nível tem um número diferente do cronômetro, no nível
          Fácil o tempo é de 2:30, no médio 2 e no difícil 1:30, sua pontuação
          final varia pelo tempo e quantidades de tentativas para solucionar.
        </p>
        <p>Abaixo os times que estão no jogo:</p>
      </div>
      <img src="../assets/img/allTimes.png" alt="">
    </div>
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
      Iniciar
    </button>
  </div>
</template>

<script lang="js">
import { mapState } from 'vuex';

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
    ...mapState([
      "titleGame",
    ]),
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

.info-container {
  display: flex;
  flex-direction: column;
  max-width: 700px;
  border: 5px dashed transparent; /* Adicione uma borda transparente para definir o espaço para o degradê */
  background-image: linear-gradient(to right, #00ff00, #0000ff, #ffff00); /* Substitua as cores pelo seu degradê desejado */
  background-origin: border-box;
  background-clip: border-box;
  padding: 5px;
  margin-top: 20px;
}

.info-container img {
  padding: 20px;
  background: white;
}

.info-text {
  max-width: 700px;
  background: #fff;
}

.info-text p {
  text-align: justify;
  font-weight: bold;
  line-height: 25px;
  padding: 20px;
  margin: 0;
}
</style>
