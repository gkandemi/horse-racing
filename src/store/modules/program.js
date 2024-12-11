import { SELECT_RANDOM_HORSES, GENERATE_ROUNDS_OF_PROGRAM } from '@/utils/helpers.js'

export default {
  namespaced: true,
  state: {
    program: null
  },
  mutations: {
    SET_PROGRAM(state, program) {
      state.program = program
    },
    TOGGLE_PROGRAM(state) {
      state.program.isRunning = !state.program.isRunning
    },
    SET_HORSE_FINISHED(state, { roundId, horseId }) {
      const round = state.program.rounds.find(round => round.id === roundId)
      const horse = round.horses.find(horse => horse.id === horseId)
      if (horse) {
        horse.isFinished = true
        horse.finishPosition = round.horses.filter(horse => horse.isFinished).length
      }
    },
    SET_ROUND_ACTIVE(state, roundId) {
      state.program.rounds.forEach(round => round.isActive = round.id === roundId)
    },
    SET_ROUND_FINISHED(state, roundId) {
      const round = state.program.rounds.find(round => round.id === roundId)
      if (round) round.isFinished = true
    }
  },
  actions: {
    GENERATE_PROGRAM({ commit, rootGetters }) {
      const _HORSE_LIST = rootGetters['horse/_GET_HORSES']
      const rounds = GENERATE_ROUNDS_OF_PROGRAM(_HORSE_LIST)

      const program = {
        id: new Date().getTime().toString(16),
        isRunning: false,
        rounds
      }
      commit("SET_PROGRAM", program)
    },
    SET_HORSE_FINISHED({ commit, getters }, { roundId, horseId }) {
      commit('SET_HORSE_FINISHED', { roundId, horseId })

      // Check if all horses in the round are finished
      const allHorsesAreFinished = getters._GET_CURRENT_PROGRAM_HORSES.every(horse => horse.isFinished)

      if(allHorsesAreFinished) {
        console.log(`${roundId} horses are finished`, allHorsesAreFinished)
        commit('SET_ROUND_FINISHED', roundId)
        const nextRound = getters._GET_CURRENT_PROGRAM?.rounds?.find(round => !round.isActive && !round.isFinished)
        if(nextRound) commit('SET_ROUND_ACTIVE', nextRound.id)
      }

    }
  },
  getters: {
    _GET_CURRENT_PROGRAM: state => state.program,
    _GET_CURRENT_PROGRAM_HORSES: state => {
      const currentRound = state.program?.rounds.find(round => round.isActive)
      if (!currentRound) return state?.program?.rounds[0]?.horses
      return currentRound?.horses
    },
    _IS_RACE_FINISHED: state => state.program?.rounds.every(round => round.isFinished),
    _IS_RACE_RUNNING: state => state.program?.isRunning,
    _GET_CURRENT_ROUND: state => state.program?.rounds.find(round => round.isActive),
    _IS_PROGRAM_AVAILABLE: state => !!state.program
  }
}

