import { createStore } from 'vuex'
import horse from './modules/horse.js'
import program from './modules/program.js'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    horse,
    program
  }
})

