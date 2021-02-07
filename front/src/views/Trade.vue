<template>
  <div class="trade">
    <SymbolSwitcher />
    <div class="order-wrap">
      <!-- <OrderBox class="order-box" /> -->
      <div class="order-box">
        <b-card no-body>
          <b-tabs pills card>
            <b-tab title="매수" active>
              <b-card-text>
                <b-dropdown
                  text="리밋 주문"
                  block
                  split
                  split-variant="outline-primary"
                  variant="primary"
                  class="m-2"
                >
                  <b-dropdown-item href="#">Action</b-dropdown-item>
                  <b-dropdown-item href="#">Another action</b-dropdown-item>
                  <b-dropdown-item href="#">Something else here...</b-dropdown-item>
                </b-dropdown>
                <b-input-group class="mt-3">
                  <b-button variant="outline-success">-</b-button>
                  <b-form-input></b-form-input>
                  <b-button variant="info">+</b-button>
                </b-input-group>

                <b-input-group class="mt-3">
                  <b-button variant="outline-success">-</b-button>
                  <b-form-input></b-form-input>
                  <b-button variant="info">+</b-button>
                </b-input-group>

                <b-input-group prepend="0" append="100" class="mt-3">
                  <b-form-input type="range" min="0" max="100"></b-form-input>
                </b-input-group>

                <b-form-input placeholder="합계"></b-form-input>
                <div class="available">
                  <div class="text">사용 가능</div>
                  <div class="amount">3883.345678</div>
                </div>
                <b-button variant="info" class="ask-button">매수</b-button>
              </b-card-text>
            </b-tab>
            <b-tab title="매도"><b-card-text>Tab contents 2</b-card-text></b-tab>
          </b-tabs>
        </b-card>
      </div>
      <!-- <OrderBook :depth="depth" class="order-book" /> -->
      <div class="order-book">
        <b-list-group>
          <div class="ORDER" v-for="(item, index) in S" :key="item + index">
            <b-list-group-item button>
              {{ item }}
            </b-list-group-item>
          </div>
        </b-list-group>
        <div class="CURRENT">CURRENT</div>
        <b-list-group>
          <div class="ORDER" v-for="(item, index) in B" :key="item + index">
            <b-list-group-item button>
              {{ item }}
            </b-list-group-item>
          </div>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "../api";
import SymbolSwitcher from "@/components/symbol-switcher.vue";
import OrderBox from "@/components/order-box.vue";
import OrderBook from "@/components/order-book.vue";
import socket from "../api/socket";

@Component({
  components: {
    SymbolSwitcher,
    OrderBox,
    OrderBook
  }
})
export default class Trade extends Vue {
  public name = "marketId";
  public S: Array<any> = [];
  public B: Array<any> = [];

  // orderbox
  public type = "S";
  public kind = "L";
  public price = 0;
  public qty = 0;
  public perc = 0;
  get totalPrice() {
    return this.qty * this.price
  }

  get marketId() {
    return this.$route.params.marketId;
  }
  setDepth(data) {
    const { name, S, B } = JSON.parse(data);
    this.name = name;
    this.S = S;
    this.B = B;
  }
  created() {
    socket.emit("subscribe", `depth@${this.marketId}`);
    socket.on("depth", this.setDepth);
  }
}
</script>
<style lang="scss" scoped>
.order-wrap {
  display: flex;
  .order {
    &-box {
      width: 60%;
    }
    &-book {
      width: 40%;
    }
  }
}
</style>
