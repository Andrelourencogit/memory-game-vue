<template>
  <div class="game">
    <template v-if="correctAnswers > 9 || timeGame < 1">
      <div class="container-finish">
        <p class="parabens" v-if="correctAnswers === 10">
          Parabéns <span class="nome">{{ namePlayer }} </span>, você venceu, sua
          pontuação final é
          <span class="pontuacao"> {{ pointsFinal }} </span> !!!
        </p>
        <p class="parabens" v-else>
          Final de jogo {{ namePlayer }}, sua pontuação é {{ pointsFinal }} !!!
        </p>

        <!-- <button class="restart-button" @click="restartGame">
          Recomeçar Jogo
        </button> -->
        <button class="restart-button" @click="reloadGame">
          Encerrar Jogo
        </button>
      </div>
    </template>
    <template v-else>
      <div class="timer-container">
        <div class="timer">{{ formatTime }}</div>
      </div>
      <Card :infoCards="cards" />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { defineComponent } from "vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "Game",
  components: {
    Card,
  },
  data() {
    return {
      cards: [
        {
          id: 1,
          idMatching: 1,
          flipped: false,
          img: require("@/assets/img/atletico.png"),
          name: "Atlético-Mg",
        },
        {
          id: 2,
          idMatching: 2,
          flipped: false,
          img: require("@/assets/img/bahia.png"),
          name: "Bahia",
        },
        {
          id: 3,
          idMatching: 3,
          flipped: false,
          img: require("@/assets/img/corinthians.png"),
          name: "Corinthians",
        },
        {
          id: 4,
          idMatching: 4,
          flipped: false,
          img: require("@/assets/img/cruzeiro.png"),
          name: "Cruzeiro",
        },
        {
          id: 5,
          idMatching: 5,
          flipped: false,
          img: require("@/assets/img/flamengo.png"),
          name: "Flamengo",
        },
        {
          id: 6,
          idMatching: 6,
          flipped: false,
          img: require("@/assets/img/gremio.png"),
          name: "Grêmio",
        },
        {
          id: 7,
          idMatching: 7,
          flipped: false,
          img: require("@/assets/img/internacional.png"),
          name: "Internacional",
        },
        {
          id: 8,
          idMatching: 8,
          flipped: false,
          img: require("@/assets/img/palmeiras.png"),
          name: "Palmeiras",
        },
        {
          id: 9,
          idMatching: 9,
          flipped: false,
          img: require("@/assets/img/saopaulo.png"),
          name: "São Paulo",
        },
        {
          id: 10,
          idMatching: 10,

          flipped: false,
          img: require("@/assets/img/vasco.png"),
          name: "Vasco",
        },
      ],
      timeGame: 90,
    };
  },
  computed: {
    ...mapState([
      "timeInit",
      "numbersAttempts",
      "correctAnswers",
      "namePlayer",
      "timeInit",
      "timeFinal",
    ]),
    formatTime() {
      let scd = this.timeGame;
      const minutes = Math.floor(this.timeGame / 60);
      const seconds = scd % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
    pointsFinal() {
      let score =
        this.correctAnswers +
        this.correctAnswers * (this.timeGame / this.timeInit) +
        100 * (10 / this.numbersAttempts);
      return score.toFixed(2);
    },
  },
  created() {
    this.timeGame = this.timeInit;
    // Duplica os cards
    let duplicatedCards = [...this.cards, ...this.cards];

    duplicatedCards = duplicatedCards.map((card, cont) => {
      if (cont > 9) {
        return { ...card, id: card.id + 10 };
      }
      return card;
    });

    // Embaralha os cards aleatoriamente
    this.cards = this.shuffleArray(duplicatedCards);
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    shuffleArray(array) {
      // Implementação do algoritmo de Fisher-Yates para embaralhar o array
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    startTimer() {
      let countdown = this.timeGame; // Tempo total da contagem regressiva
      const timer = setInterval(() => {
        countdown--; // Decrementa o valor da contagem regressiva
        if (countdown >= 0 && this.correctAnswers < 9) {
          this.timeGame = countdown; // Atualiza o valor do tempo do cronômetro
        } else {
          clearInterval(timer); // Para o cronômetro quando a contagem regressiva chegar a zero
        }
      }, 1000);
    },
    flipAllCards() {
      this.localInfoCards = this.localInfoCards.map((info) => {
        return { ...info, flipped: true };
      });
    },
    restartGame() {
      this.$store.commit("SET_NUMBERS_ATTEMPTS", 0);
      this.$store.commit("SET_CORRECT_ANSWERS", 0);
    },
    reloadGame() {
      this.$router.push("/");
      this.$store.commit("SET_NUMBERS_ATTEMPTS", 0);
      this.$store.commit("SET_CORRECT_ANSWERS", 0);
    },
  },
});
</script>

<style scoped>
.timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.timer {
  font-size: 48px;
  font-weight: bold;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  background: linear-gradient(to right, #00ff00, #0000ff, #ffff00);
  border: 2px solid;
}

.parabens {
  font-size: 24px;
  color: #ffffff;
  text-align: center;
}

.nome {
  font-weight: bold;
}

.pontuacao {
  color: #000000;
}

.restart-button {
  margin-top: 100px;
  padding: 10px 20px;
  background: linear-gradient(to right, #00ff00, #0000ff, #ffff00);
  color: #fff;
  font-size: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: max-content;
}
</style>
