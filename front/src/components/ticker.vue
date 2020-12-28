<template>
  <div class="hello">
    <b-list-group  >
      <b-list-group-item button>
        <div class="tickers" v-for='ticker in tickers' :key = ticker>
          {{ticker.name}}
          {{ticker.point}}
        </div>
        <div class="name"> NAME </div>
        <div class="point"> POINT </div>
        <div class="diff"> DIFF </div>
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
  
  @Getter('getTicker') getTicker: any;
  
  get tickers() {
    return this.getTicker
  }
  created() {
    // console.log("")
  }
  mounted() {
    // console.log("")
  }
}
</script>
