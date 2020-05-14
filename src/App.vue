<script>
import logoSrc from 'sprites/bowerser-window-logo.jpg';
export default {
  data() {
    return {
      logoSrc
    };
  },
  methods: {}
};
</script>

<template>
  <div class="app">
    123a
    <div class="icon" />
    <img
      src="~sprites/bowerser-window-logo.jpg"
      alt="123211123"
    >
  </div>
</template>

<style lang="stylus">
.app {
  display: flex;
  color: red;
}

.icon {
  width: 200px;
  height: 200px;
  background: url('~sprites/bowerser-window-logo.jpg');
}
</style>
