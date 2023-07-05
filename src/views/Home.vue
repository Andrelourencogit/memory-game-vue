<template>
  <div class="home">
    <Card :infoCards="cards" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue"; // @ is an alias to /src

interface InfoCard {
  id: number;
  idMatching: number;
  flipped: boolean;
  img: string;
  name: string;
}

export default defineComponent({
  name: "Home",
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
      ] as InfoCard[],
      total: 0,
      quantidadeTotal: 0,
      submiteForm: false,
    };
  },
  created() {
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
  methods: {
    shuffleArray(array: any) {
      // Implementação do algoritmo de Fisher-Yates para embaralhar o array
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
});
</script>
