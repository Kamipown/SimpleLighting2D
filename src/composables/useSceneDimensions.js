import { watch, computed, reactive } from 'vue'
import { useStore } from 'vuex'

import useWindowDimensions from './useWindowDimensions'

const useSceneDimensions = () => {
  const store = useStore()

  const windowDimensions = useWindowDimensions()
  const fullScreen = computed(() => store.getters.fullScreen)

  const dimensions = reactive({
    width: 0,
    height: 0
  })

  watch([windowDimensions, fullScreen], ([{width, height}, full]) => {
    dimensions.width = full ? width : width - 720
    dimensions.height = height
  })

  return dimensions
}

export default useSceneDimensions
