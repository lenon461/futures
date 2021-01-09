<template>
  <div class="trade">
    <SymbolSwitcher/>
    <div class="order-wrap">
      <OrderBox class="order-box"/>
      <OrderBook :depth="depth" class="order-book"/>
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
    OrderBox
    ,OrderBook
  }
})
export default class Trade extends Vue {
  public depth = {}

  setDepth(data){ 
    this.depth = JSON.parse(JSON.parse(data));
  }
  created() {
    socket.emit('subscribe', 'depth@PAKA')
    socket.on('depth', this.setDepth)
  }

  private fav;
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
