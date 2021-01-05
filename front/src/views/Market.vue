<template>
  <div>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="즐겨찾기" active>
        <Ticker :summoners="summoners"></Ticker>
      </b-tab>
      <b-tab title="인기">
        <Ticker></Ticker>
      </b-tab>
      <b-tab title="프로">
        <Ticker></Ticker>
      </b-tab>
      <b-tab title="아마">
        <Ticker></Ticker>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Ticker from "@/components/ticker.vue";
import Api from "../api";
import socket from "../api/socket";

@Component({
  components: {
    Ticker
  }
})
export default class Market extends Vue {
  summoners:any = []
  error:any = []
  // async summoners() {
  //    return await Api.Summoners.getSummoners()
  // }
  async created() {
    // console.log("")
     this.summoners = await Api.Summoners.getSummoners()
     this.summoners = await Api.Summoners.getError()
  }
  
}
</script>
