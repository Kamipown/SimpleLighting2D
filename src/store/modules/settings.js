const state = () => ({
  showGizmos: true,
  showGizmosFullScreen: false,
  autoMaximize: true,
  scale: 8
})

const getters = {
  showGizmos: state => state.showGizmos,
  showGizmosFullScreen: state => state.showGizmosFullScreen,
  autoMaximize: state => state.autoMaximize,
  scale: state => state.scale
}

const actions = {
  toggleShowGizmos: ({ commit }) => {
    commit('toggleShowGizmos')
  },
  toggleShowGizmosFullScreen: ({ commit }) => {
    commit('toggleShowGizmosFullScreen')
  },
  toggleAutoMaximize: ({ commit }) => {
    commit('toggleAutoMaximize')
  },
  setScale: ({ commit }, value) => {
    commit('setScale', value)
  }
}

const mutations = {
  toggleShowGizmos: state => {
    state.showGizmos = !state.showGizmos
  },
  toggleShowGizmosFullScreen: state => {
    state.showGizmosFullScreen = !state.showGizmosFullScreen
  },
  toggleAutoMaximize: state => {
    state.autoMaximize = !state.autoMaximize
  },
  setScale: (state, value) => {
    state.scale = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
