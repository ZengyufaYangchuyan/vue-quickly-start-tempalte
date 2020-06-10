<script>
export default {
  data () {
    return {};
  },
  methods: {
    httpRequest () {
      this.$http({
        url: 'dsadsa',
        method: 'get',
        data: {},
        success: res => {
          console.log(res);
        },
        fail: res => {
          console.log('fail:', res);
        }
      });
    }
  }
};
</script>

<template>
  <div
    @click="httpRequest"
  >
    page 1
  </div>
</template>

<style lang="less">

</style>
