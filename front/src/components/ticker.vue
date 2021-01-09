<template>
  <div class="hello">
    <b-list-group  >
      <b-list-group-item button>
        <div class="sorting">
          <div class="name-amount">이름/거래량</div>
          <div class="last-amount">마지막 체결가</div>
          <div class="close-ratio">전일 대비%</div>
        </div>
        <div class="ticker" v-for="(summoner, index) in summoners" :key ="summoner + index" @click="join(item.name)">
          summoner
        </div>
        <div class="coin-wraper">
          <div class="name"> NAME </div>
          <div class="point"> POINT </div>
          <div class="diff"> DIFF </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {State, Action, Getter} from 'vuex-class';

import socket from "../api/socket";
@Component
export default class Ticker extends Vue {
  
  @Prop() readonly summoners!: any
  
  created() {
    // console.log("")
  }
  mounted() {
    // console.log("")
  }
  join(name) {
    socket.emit("subscribe", name)
  }
}
</script>

<style lang="scss" scoped>
.sorting, .coin-wraper {
  display: flex;
  justify-content: space-between;
}
.sorting {
  font-size: 12px;
}
</style>
