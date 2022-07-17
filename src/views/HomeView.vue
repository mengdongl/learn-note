<template>
  <div class="home">
    <vue-lazy-component :timeout="10000">
      <HelloWorld msg="Welcome to Your Vue.js App" key="1"/>
      <HelloWorld msg="Welcome to Your Vue.js App" :empty="true"  slot="skeleton"/>
    </vue-lazy-component>
    <vue-lazy-component>
      <HelloWorld msg="Welcome to Your Vue.js App" key="2"/>
      <HelloWorld msg="Welcome to Your Vue.js App" :empty="true"  slot="skeleton"/>
    </vue-lazy-component>
    <vue-lazy-component>
      <HelloWorld msg="Welcome to Your Vue.js App" key="3"/>
      <HelloWorld msg="Welcome to Your Vue.js App" :empty="true"  slot="skeleton"/>
    </vue-lazy-component>
    <vue-lazy-component>
      <HelloWorld msg="Welcome to Your Vue.js App" key="4"/>
      <HelloWorld msg="Welcome to Your Vue.js App" :empty="true"  slot="skeleton"/>
    </vue-lazy-component>
    <vue-lazy-component>
      <HelloWorld msg="Welcome to Your Vue.js App" key="5"/>
      <HelloWorld msg="Welcome to Your Vue.js App" :empty="true"  slot="skeleton"/>
    </vue-lazy-component>
    <vue-lazy-component>
      <HelloWorld msg="Welcome to Your Vue.js App" key="6"/>
      <HelloWorld msg="Welcome to Your Vue.js App" :empty="true"  slot="skeleton"/>
    </vue-lazy-component>
    <vue-lazy-component>
      <HelloWorld msg="Welcome to Your Vue.js App" key="7"/>
      <HelloWorld msg="Welcome to Your Vue.js App" :empty="true"  slot="skeleton"/>
    </vue-lazy-component>
    <vue-lazy-component>
      <HelloWorld msg="Welcome to Your Vue.js App" key="8"/>
      <HelloWorld msg="Welcome to Your Vue.js App" :empty="true"  slot="skeleton"/>
    </vue-lazy-component>
    <vue-lazy-component>
      <HelloWorld msg="Welcome to Your Vue.js App" key="9"/>
      <HelloWorld msg="Welcome to Your Vue.js App" :empty="true"  slot="skeleton"/>
    </vue-lazy-component>
    <vue-lazy-component>
      <HelloWorld msg="Welcome to Your Vue.js App"/>
      <HelloWorld msg="Welcome to Your Vue.js App" :empty="true"  slot="skeleton"/>
    </vue-lazy-component>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
<style lang="less" scoped>
  .home{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
