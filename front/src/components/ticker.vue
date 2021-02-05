<template>
  <div class="hello">
    <b-list-group>
      <div class="sorting">
        <div class="name-amount">이름/거래량</div>
        <div class="last-amount">마지막 체결가</div>
        <div class="close-ratio">전일 대비%</div>
      </div>
      <b-list-group-item button v-for="(tick, index) in ticker" :key="index">
        <div class="ticker" @click="join(item.name)">
          <div class="coin-wraper">
            <div class="name">{{ tick.marketId }}</div>
            <div class="point">{{ tick.point }}</div>
            <div class="diff">+ 0.00%</div>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";

import socket from "../api/socket";
@Component
export default class Ticker extends Vue {
  @Prop() readonly ticker!: any;

  created() {
    // console.log("")
  }
  mounted() {
    // console.log("")
  }
  join(name) {
    socket.emit("subscribe", name);
  }
}
</script>

<style lang="scss" scoped>
.sorting,
.coin-wraper {
  display: flex;
  justify-content: space-between;
}
.sorting {
  font-size: 12px;
}
</style>
