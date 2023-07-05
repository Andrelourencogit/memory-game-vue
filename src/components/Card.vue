<template>
  <ul>
    <template v-for="info in localInfoCards" :key="info.id">
      <transition name="card-transition" mode="out-in">
        <template v-if="info.flipped">
          <li
            class="card"
            @click="flipCard(info)"
            :class="['card-content', { flipped: info.flipped }]"
          >
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

<script lang="ts">
import { defineComponent } from "vue";

interface InfoCard {
  id: number;
  idMatching: number;
  img: string;
  name: string;
  flipped: boolean;
}

export default defineComponent({
  props: {
    infoCards: { type: Array as () => InfoCard[], required: true },
  },
  data() {
    return {
      flippedCards: [] as number[],
      localInfoCards: [] as InfoCard[],
    };
  },
  mounted() {
    this.localInfoCards = [...this.infoCards];
  },
  methods: {
    flipCard(card: InfoCard) {
      if (
        this.flippedCards.length < 2 &&
        !this.flippedCards.includes(card.idMatching)
      ) {
        card.flipped = true;
        this.flippedCards.push(card.idMatching);

        if (this.flippedCards.length === 2) {
          const [card1, card2] = this.flippedCards;
          console.log("if tam 2", this.flippedCards);
          console.log("card1", card1);
          console.log("card2", card2);

          if (
            this.localInfoCards[card1 - 1].idMatching ===
            this.localInfoCards[card2 - 1].idMatching
          ) {
            // Lógica para quando os dois cartões são iguais
            console.log("Cartões iguais!");
          } else {
            // Lógica para quando os dois cartões são diferentes
            console.log("Cartões não iguais iguais!");
            setTimeout(() => {
              this.localInfoCards = this.localInfoCards.map((info) => {
                if (info.id === card1 || info.id === card2) {
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
