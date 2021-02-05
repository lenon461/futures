<template>
  <div class="footer">
    <b-button-group name="footer">
      <b-button to="/home">Home</b-button>
      <b-button to="/market">Market</b-button>
      <b-button to="/trade">Trade</b-button>
      <b-button disabled>Futures</b-button>
      <b-button>Asset</b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
  created() {
    // console.log("")
  }
  mounted() {
    // console.log("")
  }
}
</script>

<style lang="scss" scoped>

.active {
  background-color: green;
}

</style>
