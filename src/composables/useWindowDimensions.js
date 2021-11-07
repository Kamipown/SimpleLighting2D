import { reactive, onBeforeMount, onBeforeUnmount } from 'vue'

const useWindowDimensions = () => {
  const dimensions = reactive({
    width: 0,
    height: 0
  })

  const onResize = () => {
    dimensions.width = window.innerWidth
    dimensions.height = window.innerHeight
  }

  onBeforeMount(() => {
    window.addEventListener('resize', onResize, false)
    onResize()
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize, false)
  })

  return dimensions
}

export default useWindowDimensions
