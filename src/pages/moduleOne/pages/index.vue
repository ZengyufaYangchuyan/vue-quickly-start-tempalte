<script>
export default {
  data () {
    return {
      router: [
        {
          path: 'pageOne',
          pathName: '页面1'
        },
        {
          path: 'pageTwo',
          pathName: '页面2'
        },
        {
          path: 'pageThree',
          pathName: '页面3'
        }
      ]
    };
  }
};
</script>

<template>
  <div>
    <h2>module one</h2>
    <template
      v-for="item in router"
    >
      <router-link
        :key="item.path"
        :to="item.path"
      >
        {{ item.pathName }}
      </router-link>
    </template>
    <router-view />
  </div>
</template>

<style lang="less">

</style>
