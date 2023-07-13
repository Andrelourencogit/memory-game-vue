import { createStore } from "vuex";

export default createStore({
  state: {
    titleGame: "Jogo Da Memória de times do Brasil",
    selectedOption: "facil",
    namePlayer: "",
    timeInit: 0,
    timeFinal: 0,
    correctAnswers: 0,
    numbersAttempts: 0,
    reloadgame: false,
  },
  mutations: {
    SET_CORRECT_ANSWERS(state, payload) {
      state.correctAnswers = payload;
    },
    SET_NUMBERS_ATTEMPTS(state, payload) {
      state.numbersAttempts = payload;
    },
    SET_SELECTED_OPTION(state, option) {
      state.selectedOption = option;
      if (option === "facil") {
        state.timeInit = 150;
      } else if (option === "medio") {
        state.timeInit = 120;
      } else {
        state.timeInit = 90;
      }
    },
    SET_NAME_PLAYER(state, name) {
      state.namePlayer = name;
    },
    INCREMENT_CORRECT_ANSWERS(state) {
      state.correctAnswers++;
    },
    INCREMENT_NUMBERS_ATTEMPTS(state) {
      state.numbersAttempts++;
    },
  },
  actions: {},
  modules: {},
  getters: {},
});
