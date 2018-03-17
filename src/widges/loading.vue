<template>
  <div v-loading="true">
  </div>
</template>

<script>
import connect from "@/apis/connect";

export default {
  name: "MainPage",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
div {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff60;
  z-index: 99;
}
</style>
