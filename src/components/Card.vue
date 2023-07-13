<template>
  <p class="feedback-game">Tentativas: {{ numbersAttempts }}</p>
  <p class="feedback-game">Acertos: {{ correctAnswers }}</p>
  <ul>
    <template v-for="info in localInfoCards" :key="info.id">
      <transition name="card-transition" mode="out-in">
        <template v-if="info.flipped">
          <li class="card" :class="['card-content', { flipped: info.flipped }]">
            <img :src="info.img" :alt="info.name" class="card-image" />
            <div class="card-content">
              <h3 class="card-title">{{ info.name }}</h3>
            </div>
          </li>
        </template>
        <template v-else>
          <li class="card-back" @click="flipCard(info)">
            <img src="../assets/img/cbf.png" class="card-image" />
          </li>
        </template>
      </transition>
    </template>
  </ul>
</template>

<script>
import { mapState } from "vuex";

import { defineComponent } from "vue";

export default defineComponent({
  props: {
    infoCards: { type: Array, required: true },
  },
  data() {
    return {
      flippedCards: [],
      localInfoCards: [],
    };
  },
  computed: {
    ...mapState(["correctAnswers", "numbersAttempts"]),
  },
  mounted() {
    this.localInfoCards = [...this.infoCards];
  },
  methods: {
    flipCard(card) {
      if (this.flippedCards.length < 2 && !card.flipped) {
        card.flipped = true;
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
          this.$store.commit("INCREMENT_NUMBERS_ATTEMPTS");

          const [card1, card2] = this.flippedCards;

          if (card1.idMatching === card2.idMatching) {
            this.$store.commit("INCREMENT_CORRECT_ANSWERS");
            setTimeout(() => {
              this.flippedCards = [];
            }, 1000);
          } else {
            setTimeout(() => {
              card1.flipped = false;
              card2.flipped = false;
              this.flippedCards = [];
            }, 1000);
          }
        }
      }
    },
  },
});
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
}

.feedback-game {
  font-size: 25px;
  font-weight: bold;
  color: #ffffff;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 140px;
  width: 115px;
  margin: 10px;
  transition: transform 0.5s ease;
  background: #ffffff;
}

.card-back {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 182px;
  width: 157px;
  margin: 10px;
}

.card-back .card-image {
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 8px;
  object-fit: cover;
}

.card-image {
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.card-id {
  margin-top: 8px;
  font-size: 14px;
  color: #888;
}

/* Transições */
.card-transition-enter-active,
.card-transition-leave-active {
  transition: transform 0.5s;
}

.card-transition-enter,
.card-transition-leave-to {
  transform: rotateY(180deg);
}
</style>
