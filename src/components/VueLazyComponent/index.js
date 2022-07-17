import VueLazyComponent from './VueLazyComponent.vue'

const vueLazyComponent = {}

/**
 * Plugin API
 */
vueLazyComponent.install = function (Vue, options) {
  Vue.component(VueLazyComponent.name, VueLazyComponent)
}

vueLazyComponent.component = VueLazyComponent

/**
 * Auto install
 */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueLazyComponent)
}

export default vueLazyComponent
