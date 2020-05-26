<script>
export default {
  data () {
    return {};
  },
  methods: {
    toPath () {
      this.$router.push({
        path: '/home/moduleOne'
      });
      console.log(this.$router);
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
    <router-link
      to="/home/moduleOne"
    >
      跳转到模块1
    </router-link>
    <router-view />
  </div>
</template>

<style lang="stylus"></style>
