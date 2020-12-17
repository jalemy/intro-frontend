<template>
  <div id="app">
    <h1>Introduction</h1>
    <p v-on:click="reverse">{{ foo }}</p>
    <Hello message="Hello Vue!" />
  </div>
</template>

<script>
import Hello from "./Hello.vue";

export default {
  name: "App",
  components: {
    Hello,
  },
  data() {
    return {
      foo: "foo text.",
    };
  },
  methods: {
    reverse() {
      this.foo = this.foo.split("").reverse().join("");
    },
  },
};
</script>

<style scoped>
h1 {
  color: #f90;
}
</style>
