import { createStore } from 'vuex'

import imageMap from './modules/imageMap'
import lights from './modules/lights'
import settings from './modules/settings'

import useWorker from '@/composables/useWorker'

import lighting from '@/workers/lighting'

import hexToRGB from '@/lib/hexToRGB'

const state = () => ({
  fullScreen: false,

  processing: false,
  progress: 0,
  results: null
})

const getters = {
  fullScreen: state => state.fullScreen,
  processing: state => state.processing,
  progress: state => state.progress,
  results: state => state.results
}

const actions = {
  toggleFullScreen: ({ commit, state }) => {
    commit('setFullScreen', !state.fullScreen)
  },
  process: ({ commit, state }) => {
    commit('setProcessing', true)
    commit('setProgress', 0)

    const worker = useWorker(lighting)

    worker.onmessage=({ data }) => {
      if (data.type === 'progress') {
        commit('setProgress', data.value)
      }
      else if (data.type === 'end') {
        commit('setProcessing', false)
        commit('setResults', data.value)
      }
    }
    setTimeout(() => worker.postMessage({
      colorMap: {
        imageData: state.colorMap.imageData,
        width: state.colorMap.width,
        height: state.colorMap.height
      },
      lightMap: {
        imageData: state.lightMap.imageData,
        width: state.lightMap.width,
        height: state.lightMap.height
      },
      ambiantLight: state.lights.ambiantLight.enabled ? {
        intensity: state.lights.ambiantLight.values.intensity,
        color: hexToRGB(state.lights.ambiantLight.values.color)
      } : null,
      pointLights: state.lights.pointLights.filter(light => light.enabled).map(light => ({
        x: light.values.x,
        y: light.values.y,
        radius: light.values.radius,
        intensity: light.values.intensity,
        color: hexToRGB(light.values.color)
      }))
    }), 500)
  }
}

const mutations = {
  setFullScreen: (state, value) => {
    state.fullScreen = value
  },
  setProcessing: (state, value) => {
    state.processing = value
  },
  setProgress: (state, value) => {
    state.progress = value
  },
  setResults: (state, value) => {
    state.results = value
  }
}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules: {
    colorMap: imageMap,
    lightMap: imageMap,
    lights,
    settings
  }
})
