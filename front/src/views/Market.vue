<template>
  <div>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="즐겨찾기" disabled>
        X
      </b-tab>
      <b-tab title="인기" active>
        <Ticker :ticker="ticker"></Ticker>
      </b-tab>
      <b-tab title="프로">
        X
      </b-tab>
      <b-tab title="아마">
        X
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Ticker from "@/components/ticker.vue";
import Api from "../api";
import socket from "../api/socket";
import { State, Action, Getter } from "vuex-class";

@Component({
  components: {
    Ticker
  }
})
export default class Market extends Vue {
  summoners: any = [];
  error: any = [];

  @Getter("getTicker") ticker: any;

  get items() {
    return this.ticker;
  }
  created() {
    // console.log("")
    this.summoners = Api.Summoners.getSummoners();
    this.summoners = Api.Summoners.getError();
  }
}
</script>

<style lang="scss" scoped></style>
