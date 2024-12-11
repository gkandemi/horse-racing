import { GENERATE_RANDOM_HORSES } from '../../utils/helpers.js'

export default {
  namespaced: true,
  state: {
    horses: []
  },
  mutations: {
    GENERATE_HORSES(state) {
      state.horses = GENERATE_RANDOM_HORSES() || []
    }
  },
  actions: {},
  getters: {
    _GET_HORSES: state => state.horses,
    _GET_ORDERED_HORSES: state => state.horses.sort((a, b) => b.condition - a.condition)
  }
}

