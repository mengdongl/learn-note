<template>
  <div class="hello">
    <div v-if="empty" class="empty">
      <p>loading......</p>
    </div>
    <div v-else>
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>{{ msg }}</h1>
      <p>
        For a guide and recipes on how to configure / customize this project,<br />
        check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
          >vue-cli documentation</a
        >.
      </p>
      <h3>Installed CLI Plugins</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    empty: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  border: 1px solid gray;
  border-radius: 25px;
  display: inline-block;
  text-align: center;
  padding: 10px;
  .empty{
    font-size: 20px;
    text-align: center;
    width: 483px;
    height: 381px;
  }
}
</style>
