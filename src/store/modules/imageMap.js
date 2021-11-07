import loadImage from '@/lib/loadImage'

const state = () => ({
  name: null,
  size: null,
  date: null,
  src: null,
  imageData: null,
  width: null,
  height: null,
})

const getters = {
  name: state => state.name,
  size: state => state.size,
  date: state => state.date,
  src: state => state.src,
  imageData: state => state.imageData,
  width: state => state.width,
  height: state => state.height
}

const actions = {
  loadDefault: ({ commit }, { data, setResults }) => {
    loadImage(data.src, ({ imageData, width, height }) => {
      commit('set', {
        name: data.name,
        size: data.size,
        date: data.date,
        src: data.src,
        imageData,
        width,
        height
      })
      if (setResults) {
        setTimeout(() => commit('setResults', imageData, { root: true }), 0)
      }
    })
  },
  load: ({ commit }, { file, setResults}) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      loadImage(reader.result, ({ imageData, width, height }) => {
        commit('set', {
          name: file.name,
          size: file.size,
          date: file.lastModifiedDate,
          src: reader.result,
          imageData,
          width,
          height
        })
        if (setResults) {
          setTimeout(() => commit('setResults', imageData, { root: true }), 0)
        }
      })
    }, false)
    reader.readAsDataURL(file)
  }
}

const mutations = {
  set: (state, data) => {
    state.name = data.name
    state.size = data.size
    state.date = data.date
    state.src = data.src
    state.imageData = data.imageData
    state.width = data.width
    state.height = data.height
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
