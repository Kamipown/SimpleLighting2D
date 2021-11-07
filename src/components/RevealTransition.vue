<template>
  <transition name="expand" @afterEnter="afterEnter" @enter="enter" @leave="leave">
    <slot/>
  </transition>
</template>
<script>
  export default {
    methods: {
      afterEnter(element) {
        // eslint-disable-next-line no-param-reassign
        element.style.height = 'auto'
      },
      enter(element) {
        const { width } = getComputedStyle(element)

        /* eslint-disable no-param-reassign */
        element.style.width = width
        element.style.position = 'absolute'
        element.style.visibility = 'hidden'
        element.style.height = 'auto'
        /* eslint-enable */

        const { height } = getComputedStyle(element)

        /* eslint-disable no-param-reassign */
        element.style.width = null
        element.style.position = null
        element.style.visibility = null
        element.style.height = 0
        /* eslint-enable */

        // Force repaint to make sure the
        // animation is triggered correctly.
        // eslint-disable-next-line no-unused-expressions
        getComputedStyle(element).height

        requestAnimationFrame(() => {
          // eslint-disable-next-line no-param-reassign
          element.style.height = height
        })
      },
      leave(element) {
        const { height } = getComputedStyle(element)

        // eslint-disable-next-line no-param-reassign
        element.style.height = height

        // Force repaint to make sure the
        // animation is triggered correctly.
        // eslint-disable-next-line no-unused-expressions
        getComputedStyle(element).height

        requestAnimationFrame(() => {
          // eslint-disable-next-line no-param-reassign
          element.style.height = 0
        })
      }
    }
  }
</script>

<style>
  .expand-enter-active,
  .expand-leave-active {
    transition: height 200ms ease-in-out;
    overflow: hidden;
  }

  .expand-enter,
  .expand-leave-to {
    height: 0;
  }
</style>
