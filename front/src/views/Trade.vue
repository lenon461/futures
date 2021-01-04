<template>
  <div class="trade">
    <SymbolSwitcher/>
    <OrderBox/>
    <OrderBook :OrderBook="OrderBook"/>
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
    OrderBox
    ,OrderBook
  }
})
export default class Trade extends Vue {
  public OrderBook = {}

  setOrderBook(data){ 
    this.OrderBook = JSON.parse(JSON.parse(data));
  }
  created() {
    socket.emit('subscribe', 'depth@PAKA')
    socket.on('depth', this.setOrderBook)
  }

  private fav;
}
</script>
