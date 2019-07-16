import Vue from 'vue'
import Vuex from 'vuex'

import * as Actions from "./StoreActions"
import * as Getters from "./StoreGetters"
import * as Mutations from "./StoreMutations"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkTheme: true
  },

  actions: {
    [Actions.TOGGLE_DARK_THEME] : store => store.commit(Mutations.TOGGLE_DARK_THEME, !store.getters[Getters.IS_DARK_THEME])
  },

  getters: {
    [Getters.IS_DARK_THEME] : state => state.darkTheme
  },

  mutations: {
    [Mutations.TOGGLE_DARK_THEME] : (state, bool) => state.darkTheme = bool
  }

})
