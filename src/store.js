import Vue from 'vue'
import Vuex from 'vuex'

import * as Actions from "./store/StoreActions"
import * as Getters from "./store/StoreGetters"
import * as Mutations from "./store/StoreMutations"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkTheme: false
  },

  actions: {
    [Actions.TOGGLE_DARK_THEME] : store => store.commit(Mutations[TOGGLE_DARK_THEME], !store.getters[IS_DARK_THEME])
  },

  getters: {
    [Getters.IS_DARK_THEME] : state => state.darkTheme
  },

  mutations: {
    [Mutations.TOGGLE_DARK_THEME] : (state, bool) => state.darkTheme = bool
  }

})
