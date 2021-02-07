<template>
  <div class="trade">
    <SymbolSwitcher />
    <div class="order-container">
      <!-- <OrderBox class="order-box" /> -->
      <div class="order-box-container">
        <div class="order-box-wrap">
          <div class="order-box">
            <div class="order-type-base">
              BASE
            </div>
            <div class="order-type-label">
              LABEL
            </div>
          </div>

        </div>
        <div class="order-kind mt10">
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </div>
        <div class="order-price mt10">
          <b-button class="minus"><b-icon icon="plus"></b-icon></b-button>
          <b-form-input></b-form-input>
          <b-button class="plus"><b-icon icon="dash"></b-icon></b-button>
        </div>
        <div class="order-qty mt10">
          <b-button class="minus"><b-icon icon="plus"></b-icon></b-button>
          <b-form-input></b-form-input>
          <b-button class="plus"><b-icon icon="dash"></b-icon></b-button>
        </div>
        <div class="order-percent mt10">
          <div class="quater">
          <b-button></b-button>
          25%
          </div>
          <div class="half">
          <b-button></b-button>
          50%
          </div>
          <div class="half-quarter">
          <b-button></b-button>
          75%
          </div>
          <div class="all">
          <b-button></b-button>
          100%
          </div>
        </div>
        <div class="order-total mt10">
          {{"합계"}}
        </div>
        <div class="order-available mt10">
          <p>사용 가능</p>
          <p>{{"3838.051342342"}} {{"USDT"}}</p>
        </div>
        <div class="order-button mt10">
          <b-button class="orderBtn btn-block">{{"XRP 매수"}}</b-button>
        </div>
        <!-- <b-card no-body>
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
        </b-card> -->
      </div>
      <!-- <OrderBook :depth="depth" class="order-book" /> -->
      <div class="order-book-container">
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
  public selected = null;
  public options= [
    { value: null, text: 'Please select an option' },
    { value: 'a', text: 'This is First option' },
    { value: 'b', text: 'Selected Option' },
  ]
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
.trade {
  background-color: #eee;
}
.mt10 {
  margin-top: 10px;
}
p {
  margin-bottom: 0;
}
.order-container {
  display: flex;
  padding: 15px;
  margin-top: 15px;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  .order {
    &-box-container {
      width: 60%;
      padding-right: 10px;
    }
    &-book-container {
      width: 40%;
    }
    &-box-wrap {
      width: 100%;
      .order{
        &-box {
          display: flex;
          width: 100%;
          border: 1px solid aqua;
        }
        &-type-base {
          width: 45%;
          background: pink;
          // display: inline-block;
          height: 30px;
          position: relative;
          &:before {
            content: "";
            width: 0;
            height: 30px;
            right: -12px;
            position: absolute;
            border-style: solid;
            border-color: transparent transparent transparent pink;
            border-width: 12px 0 12px 12px;
            line-height: 30px;
          }
        }
        &-type-label {
          width: 55%;
          border: 1px solid yellow;
        }
      }
    }
    &-price {
      display: flex;
    }
    &-qty {
      display: flex;
    }
    &-percent {
      display: flex;
    }
    &-total {
      height: 40px;
      line-height: 40px;
      border-radius: 3px;
      background-color: #eee;
    }
    &-available {
      display: flex;
      justify-content: space-between;
      padding: 5px;
      font-size: 13px;
    }
  }
  &-button {
    .btn.btn-secondary.orderBtn {
      width: 100%;
    }
  }
}
</style>
