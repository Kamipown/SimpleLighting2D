const state = () => ({
  ambiantLight: {
    enabled: true,
    folded: false,
    values: {
      intensity: 50,
      color: '#cceeff'
    }
  },
  pointLights: [
    {
      id: 1,
      enabled: true,
      folded: false,
      values: {
        x: 35,
        y: 15,
        radius: 40,
        intensity: 80,
        color: '#ff0000'
      }
    },
    {
      id: 2,
      enabled: true,
      folded: false,
      values: {
        x: 10,
        y: 50,
        radius: 25,
        intensity: 75,
        color: '#0099ff'
      }
    }
  ],
  currentid: 2
})

const getters = {
  ambiantLight: state => state.ambiantLight,
  pointLights: state => state.pointLights
}

const actions = {
  add: ({ commit }, payload) => {
    commit('add', payload)
  },
  toggleEnabled: ({ commit }, payload) => {
    commit('toggleEnabled', payload)
  },
  toggleFolded: ({ commit }, payload) => {
    commit('toggleFolded', payload)
  },
  edit: ({ commit }, payload) => {
    commit('edit', payload)
  },
  delete: ({ commit }, payload) => {
    commit('delete', payload)
  }
}

const mutations = {
  add: (state, payload = {}) => {
    state.pointLights.push({
      id: ++state.currentid,
      enabled: true,
      folded: false,
      values: {
        x: 0,
        y: 0,
        radius: 100,
        intensity: 50,
        color: '#ffeecc',
        ...payload
      }
    })
  },
  toggleEnabled: (state, payload) => {
    if (payload.id === 0) {
      state.ambiantLight = {
        ...state.ambiantLight,
        enabled: !state.ambiantLight.enabled
      }
    }
    else {
      state.pointLights = state.pointLights.map(light => light.id === payload.id ? {
        ...light,
        enabled: !light.enabled
      } : light)
    }
  },
  toggleFolded: (state, payload) => {
    if (payload.id === 0) {
      state.ambiantLight = {
        ...state.ambiantLight,
        folded: !state.ambiantLight.folded
      }
    }
    else {
      state.pointLights = state.pointLights.map(item => item.id === payload.id ? {
        ...item,
        folded: !item.folded
      } : item)
    }
  },
  edit: (state, payload) => {
    if (payload.id === 0) {
      state.ambiantLight = {
        ...state.ambiantLight,
        values: {
          ...state.ambiantLight.values,
          ...payload.data
        }
      }
    }
    else {
      state.pointLights = state.pointLights.map(item => item.id === payload.id ? {
        ...item,
        values: {
          ...item.values,
          ...payload.data
        }
      } : item)
    }
  },
  delete: (state, payload) => {
    state.pointLights = state.pointLights.filter(item => item.id !== payload.id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
