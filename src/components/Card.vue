<template>
  <p>tentativas {{ tentativas }}</p>
  <p>Acertos {{ acertos }}</p>
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
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    infoCards: { type: Array, required: true },
  },
  data() {
    return {
      flippedCards: [],
      localInfoCards: [],
      tentativas: 0,
      acertos: 0,
    };
  },
  mounted() {
    this.localInfoCards = [...this.infoCards];
  },
  methods: {
    flipCard(card) {
      if (this.flippedCards.length < 2) {
        card.flipped = true;
        this.flippedCards.push(card.idMatching);

        if (this.flippedCards.length === 2) {
          this.tentativas++;
          this.$store.commit("SET_NUMBERS_ATTEMPTS", this.tentativas);

          const [card1, card2] = this.flippedCards;

          if (
            this.localInfoCards[card1 - 1].idMatching ===
            this.localInfoCards[card2 - 1].idMatching
          ) {
            // Lógica para quando os dois cartões são iguais
            this.acertos++;
            setTimeout(() => {
              this.localInfoCards = this.localInfoCards.map((info) => {
                if (info.idMatching === card1 || info.idMatching === card2) {
                  return { ...info, flipped: true };
                }
                return info;
              });
              this.flippedCards = [];
            }, 1000);
            this.$store.commit("SET_CORRECT_ANSWERS", this.acertos);
          } else {
            // Lógica para quando os dois cartões são diferentes
            setTimeout(() => {
              this.localInfoCards = this.localInfoCards.map((info) => {
                if (info.idMatching === card1 || info.idMatching === card2) {
                  return { ...info, flipped: false };
                }
                return info;
              });
              this.flippedCards = [];
            }, 1000);
          }
        }
      }
    },
    flipAllCards() {
      this.localInfoCards = this.localInfoCards.map((info) => {
        return { ...info, flipped: true };
      });
    },
  },
});
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
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
