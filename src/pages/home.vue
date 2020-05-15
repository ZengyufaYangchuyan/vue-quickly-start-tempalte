<script>
export default {
  data () {
    return {};
  },
  methods: {
    toPath () {
      console.log(this);
      this.$router.push({
        path: 'moduleOne'
      });
    }
  }
};
</script>

<template>
  <div>
    <h1>home</h1>
    <div
      @click="toPath"
    >
      跳转到模块1
    </div>
    <router-view />
  </div>
</template>

<style lang="stylus"></style>
