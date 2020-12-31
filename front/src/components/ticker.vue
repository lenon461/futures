<template>
  <div class="hello">
    <b-list-group  >
      <b-list-group-item button>
        <div class="ticker" v-for="(item, index) in items" :key ="item + index" @click="join(item.name)">
          {{item.name}}
          {{item.point}}
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
  
  get items() {
    return this.getTicker
  }
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
