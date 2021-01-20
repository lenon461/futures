<template>
  <div class="symbol-switcher">
    <div class="symbol">ETHUSDT</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";

@Component
export default class SymbolSwitcher extends Vue {
  @Getter("getTicker") getTicker: any;

  get items() {
    return this.getTicker;
  }
  created() {
    // console.log("")
  }
  mounted() {
    // console.log("")
  }
}
</script>

<style scoped>
.symbol-switcher {
  border: 5px solid indianred;
}
</style>
