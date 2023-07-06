import { createStore } from "vuex";

export default createStore({
  state: {
    title: "Jogo Da Memória de times do Brasil",
    selectedOption: "facil",
    namePlayer: "",
  },
  mutations: {
    setTitle(state, newTitle) {
      state.title = newTitle;
    },
    SET_SELECTED_OPTION(state, option) {
      state.selectedOption = option;
    },
    SET_NAME_PLAYER(state, name) {
      console.log("entrou", name);
      state.namePlayer = name;
    },
  },
  actions: {
    setNamePlayer({ commit }, name) {
      commit("SET_NAME_PLAYER", name);
    },
  },
  modules: {},
  getters: {
    getTitle: (state) => {
      return state.title;
    },
    getSelectedOption: (state) => {
      return state.selectedOption;
    },
  },
});
